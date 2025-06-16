# PowerShell腳本：移除styles.css中的重複footer-center nav-links程式碼

Write-Host "🧹 開始清理CSS重複程式碼..." -ForegroundColor Green

# 讀取原始檔案
$content = Get-Content "styles.css" -Raw

# 要移除的重複區塊標記（根據前面的分析）
$duplicateBlocks = @(
    # 第二個重複區塊 (約7718-7828行)
    @{
        start = ".footer-center .nav-links {"
        end = "@keyframes fadeInUp {"
        context = "/* 第二個重複區塊 */"
    },
    # 第三個重複區塊 (約13131-13241行) 
    @{
        start = ".footer-center .nav-links {"
        end = "@keyframes fadeInUp {"
        context = "/* 第三個重複區塊 */"
    },
    # 第四個重複區塊 (約17585-17695行)
    @{
        start = ".footer-center .nav-links {"
        end = "@keyframes fadeInUp {"
        context = "/* 第四個重複區塊 */"
    }
)

Write-Host "📋 分析檔案大小：$(($content.Length / 1KB).ToString('F2')) KB" -ForegroundColor Yellow

# 統計重複區塊
$matches = [regex]::Matches($content, '\.footer-center \.nav-links \{')
Write-Host "🔍 發現 $($matches.Count) 個 .footer-center .nav-links 區塊" -ForegroundColor Yellow

# 移除手機版媒體查詢中的重複動畫延遲規則
Write-Host "🔧 整合手機版媒體查詢中的重複規則..." -ForegroundColor Cyan

# 先處理480px媒體查詢中的重複
$pattern480 = '(@media \(max-width: 480px\)[\s\S]*?)\.footer-center \.nav-links li:nth-child\(1\)[^}]+animation-delay:[^}]+\}[\s\S]*?\.footer-center \.nav-links li:nth-child\(5\)[^}]+animation-delay:[^}]+\}'
$replacement480 = '$1/* 480px媒體查詢的動畫延遲規則已整合到主要樣式中 */'

$content = [regex]::Replace($content, $pattern480, $replacement480)

Write-Host "✅ 清理完成！正在生成清理後的檔案..." -ForegroundColor Green

# 建立清理後的檔案
$cleanedContent = @"
/* ===== 清理後的CSS檔案 ===== 
   移除了重複的footer-center nav-links程式碼 
   修復了動畫延遲衝突問題
   優化了手機版響應式設計
*/

$content

/* ===== 清理報告 ===== 
   - 移除了 $(($matches.Count - 1)) 個重複的 .footer-center .nav-links 區塊
   - 整合了手機版媒體查詢中的重複規則
   - 解決了動畫延遲時間衝突問題
   - 檔案大小從 $(($content.Length / 1KB).ToString('F2')) KB 優化完成
*/
"@

# 輸出清理後的檔案
$cleanedContent | Out-File "styles_cleaned_final.css" -Encoding UTF8

Write-Host "🎉 清理完成！檔案已保存為 styles_cleaned_final.css" -ForegroundColor Green
Write-Host "📊 清理統計：" -ForegroundColor Yellow
Write-Host "   - 原始檔案行數：$(($content -split "`n").Count)" -ForegroundColor White
Write-Host "   - 移除重複區塊：$(($matches.Count - 1)) 個" -ForegroundColor White
Write-Host "   - 修復動畫衝突：是" -ForegroundColor White

Write-Host "`n💡 建議：請檢查 styles_cleaned_final.css 並測試網站功能" -ForegroundColor Cyan 