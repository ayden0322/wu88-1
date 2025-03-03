// 導航欄滾動效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// 手機版選單切換
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// 平滑滾動效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        // 如果在手機版，點擊後關閉選單
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// 遊戲卡片動畫
const gameCards = document.querySelectorAll('.game-card');
gameCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 登入和註冊按鈕事件
const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');

loginBtn.addEventListener('click', function() {
    // 這裡可以添加登入表單的彈出視窗邏輯
    alert('開啟登入表單');
});

registerBtn.addEventListener('click', function() {
    // 這裡可以添加註冊表單的彈出視窗邏輯
    alert('開啟註冊表單');
});

// 等待 DOM 完全加載
document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    let slideInterval;
    const slides = document.querySelectorAll('.slide');
    const dotContainer = document.querySelector('.dot-container');

    // 初始化輪播指示點
    function initializeDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => currentSlide(index));
            dotContainer.appendChild(dot);
        });
    }

    // 顯示特定幻燈片
    function showSlides(n) {
        if (n === undefined) {
            slideIndex++;
        } else {
            slideIndex = n;
        }

        // 處理循環
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }

        // 隱藏所有幻燈片
        slides.forEach(slide => {
            slide.style.display = "none";
        });

        // 重置所有指示點
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.classList.remove('active-dot');
        });

        // 顯示當前幻燈片和激活對應指示點
        slides[slideIndex].style.display = "block";
        dots[slideIndex].classList.add('active-dot');
    }

    // 切換到下一張/上一張幻燈片
    window.changeSlide = function(n) {
        clearInterval(slideInterval);
        showSlides(slideIndex + n);
        startAutoSlide();
    };

    // 切換到特定幻燈片
    function currentSlide(n) {
        clearInterval(slideInterval);
        showSlides(n);
        startAutoSlide();
    }

    // 自動輪播
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            showSlides();
        }, 5000); // 每5秒切換一次
    }

    // 初始化輪播
    function initializeSlider() {
        initializeDots();
        showSlides(0);
        startAutoSlide();

        // 滑鼠懸停時暫停輪播
        const bannerSection = document.querySelector('.banner-section');
        bannerSection.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        bannerSection.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }

    // 初始化按鈕事件
    function initializeButtons() {
        const ctaBtn = document.querySelector('.cta-btn');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', function() {
                // 這裡可以添加按鈕點擊後的行為
                console.log('CTA button clicked');
            });
        }
    }

    // 執行初始化
    initializeSlider();
    initializeButtons();

    const tabs = document.querySelectorAll('.tab-item');
    const gameGrids = document.querySelectorAll('.game-grid');
    
    // 切換分類的函數
    function switchTab(tabCategory) {
        // 隱藏所有遊戲網格
        gameGrids.forEach(grid => {
            if (grid.dataset.content === tabCategory) {
                grid.style.display = 'grid';
            } else {
                grid.style.display = 'none';
            }
        });
    }

    // 為每個分類標籤添加滑鼠事件
    tabs.forEach(tab => {
        tab.addEventListener('mouseenter', () => {
            const category = tab.dataset.tab;
            switchTab(category);
            
            // 移除所有標籤的 active 類
            tabs.forEach(t => t.classList.remove('active'));
            // 添加當前標籤的 active 類
            tab.classList.add('active');
        });
    });

    // 初始顯示第一個分類
    switchTab('live');

    // 獲取所有遊戲卡片和按鈕
    const playButtons = document.querySelectorAll('.game-card.small .play-btn');
    const loginPopup = document.getElementById('loginPopup');

    // 確保找到彈出視窗元素
    if (!loginPopup) {
        console.error('找不到 loginPopup 元素');
        return;
    }

    // 為每個按鈕添加點擊事件
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // 防止事件冒泡
            
            // 顯示彈出視窗
            loginPopup.style.display = 'block';
            loginPopup.classList.add('show');
            
            // 2秒後跳轉
            setTimeout(() => {
                window.open('https://pc.wu88.live/user-login?promotionId=SEO1689', '_blank');
                loginPopup.classList.remove('show');
                loginPopup.style.display = 'none';
            }, 2000);
        });
    });

    // 也可以為整個卡片添加點擊事件
    const gameCardsSmall = document.querySelectorAll('.game-card.small');
    gameCardsSmall.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target === card || e.target.closest('.game-card')) {
                // 顯示彈出視窗
                loginPopup.style.display = 'block';
                loginPopup.classList.add('show');
                
                // 2秒後跳轉
                setTimeout(() => {
                    window.open('https://pc.wu88.live/user-login?promotionId=SEO1689', '_blank');
                    loginPopup.classList.remove('show');
                    loginPopup.style.display = 'none';
                }, 2000);
            }
        });
    });
});

// 添加淡入效果
function addFadeEffect() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.add('fade');
    });
}

// 確保圖片加載完成後再初始化輪播
window.onload = function() {
    addFadeEffect();
}; 