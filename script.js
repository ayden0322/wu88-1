// 導航欄滾動效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.05)';
    }
});

// 手機版選單切換
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const mobileAuthButtons = document.querySelector('.mobile-auth-buttons');

mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    
    // 控制手機版登入註冊按鈕的顯示
    if (navLinks.classList.contains('active')) {
        mobileAuthButtons.style.display = 'flex';
        // 延遲動畫以配合選單開啟
        setTimeout(() => {
            mobileAuthButtons.style.opacity = '1';
            mobileAuthButtons.style.transform = 'translateX(-50%) translateY(0)';
        }, 300);
    } else {
        mobileAuthButtons.style.opacity = '0';
        mobileAuthButtons.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => {
            mobileAuthButtons.style.display = 'none';
        }, 300);
    }
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
            mobileMenuBtn.classList.remove('active');
            
            // 隱藏手機版登入註冊按鈕
            if (mobileAuthButtons) {
                mobileAuthButtons.style.opacity = '0';
                mobileAuthButtons.style.transform = 'translateX(-50%) translateY(20px)';
                setTimeout(() => {
                    mobileAuthButtons.style.display = 'none';
                }, 300);
            }
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

// 性能檢測工具
class PerformanceDetector {
    constructor() {
        this.isLowPerformance = this.detectLowPerformance();
        this.reduceAnimations = this.shouldReduceAnimations();
    }

    detectLowPerformance() {
        // 更寬鬆的性能檢測 - 確保大部分設備都能顯示粒子
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isVerySmallScreen = window.innerWidth < 480; // 只有非常小的螢幕才算低性能
        const veryLowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 2; // 只有CPU核心數小於2才算低性能
        
        return isVerySmallScreen || veryLowCPU;
    }

    shouldReduceAnimations() {
        // 檢查用戶偏好設定
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
}

// 優化後的全頁粒子系統
class OptimizedGlobalParticleSystem {
    constructor() {
        console.log('初始化粒子系統...'); // 調試信息
        this.performance = new PerformanceDetector();
        this.particles = [];
        
        // 根據性能調整粒子數量 - 確保有足夠的粒子可見
        if (this.performance.isLowPerformance) {
            this.maxParticles = 20; // 提高最低數量
            this.initialParticles = 15;
        } else {
            this.maxParticles = 50; // 稍微提高數量
            this.initialParticles = 30;
        }
        
        this.container = null;
        this.lastUpdateTime = 0;
        this.updateInterval = this.performance.isLowPerformance ? 100 : 80; // 從150/100改為100/80，提高更新頻率
        
        // 總是初始化粒子系統，除非用戶明確要求減少動畫
        if (!this.performance.reduceAnimations) {
            this.init();
        } else {
            console.log('用戶偏好減少動畫，跳過粒子初始化');
        }
    }

    init() {
        console.log('創建粒子容器...'); // 調試信息
        // 創建全頁粒子容器
        this.container = document.createElement('div');
        this.container.id = 'global-particles-system';
        document.body.appendChild(this.container);

        // 立即創建初始粒子
        this.createInitialParticles();

        // 使用更高效的粒子管理
        this.startParticleManagement();
        
        // 添加備份重生機制 - 每5秒檢查一次粒子數量
        setInterval(() => {
            if (this.particles.length === 0) {
                console.log('檢測到所有粒子消失，啟動緊急重生機制');
                // 如果所有粒子都消失了，立即重新創建
                this.createInitialParticles();
            } else if (this.particles.length < this.maxParticles * 0.2) {
                console.log(`粒子數量過少 (${this.particles.length})，補充粒子`);
                // 如果粒子數量少於20%，補充一些
                const needCount = Math.floor(this.maxParticles * 0.3) - this.particles.length;
                for (let i = 0; i < needCount && i < 5; i++) {
                    this.createOptimizedParticle(false);
                }
            }
        }, 5000);
        
        console.log(`粒子系統初始化完成，目標粒子數: ${this.maxParticles}`);
    }

    createInitialParticles() {
        console.log(`開始創建 ${this.initialParticles} 個初始粒子...`);
        
        // 立即創建一批粒子，然後逐步添加剩餘的
        const immediateCount = Math.min(10, this.initialParticles);
        
        // 立即創建前10個粒子
        for (let i = 0; i < immediateCount; i++) {
            this.createOptimizedParticle(true);
        }
        
        // 分批創建剩餘粒子
        if (this.initialParticles > immediateCount) {
            const createBatch = (batchStart, batchSize) => {
                const batchEnd = Math.min(batchStart + batchSize, this.initialParticles);
                
                for (let i = batchStart; i < batchEnd; i++) {
                    this.createOptimizedParticle(true);
                }
                
                if (batchEnd < this.initialParticles) {
                    setTimeout(() => createBatch(batchEnd, batchSize), 100);
                }
            };
            
            createBatch(immediateCount, 3); // 每批3個粒子
        }
    }

    createOptimizedParticle(isInitial = false) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // 確保有足夠的大小變體
        const sizeTypes = this.performance.isLowPerformance ? ['tiny', 'small'] : ['tiny', 'small', 'medium'];
        const randomSize = sizeTypes[Math.floor(Math.random() * sizeTypes.length)];
        particle.classList.add(randomSize);

        // 提高特效機率，讓粒子更明顯
        if (Math.random() < 0.4) { // 提高到40%機率
            particle.classList.add('twinkle');
        }

        // 位置設定
        let startX, startY;
        if (isInitial) {
            startX = Math.random() * window.innerWidth;
            startY = Math.random() * window.innerHeight;
        } else {
            // 從邊緣進入
            const side = Math.floor(Math.random() * 4);
            switch(side) {
                case 0: // 頂部
                    startX = Math.random() * window.innerWidth;
                    startY = -50;
                    break;
                case 1: // 右側
                    startX = window.innerWidth + 50;
                    startY = Math.random() * window.innerHeight;
                    break;
                case 2: // 底部
                    startX = Math.random() * window.innerWidth;
                    startY = window.innerHeight + 50;
                    break;
                case 3: // 左側
                    startX = -50;
                    startY = Math.random() * window.innerHeight;
                    break;
            }
        }

        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';

        // 確保動畫參數正確設定
        const animationDuration = this.performance.isLowPerformance ? 6 : 4; // 縮短動畫時間讓效果更明顯
        particle.style.animationDuration = animationDuration + 's';
        particle.style.animationDelay = Math.random() * 1 + 's'; // 縮短延遲
        
        // 確保粒子可見
        particle.style.opacity = '1';
        particle.style.zIndex = '1';

        this.container.appendChild(particle);
        
        const particleData = {
            element: particle,
            x: startX,
            y: startY,
            life: 0,
            maxLife: this.performance.isLowPerformance ? 
                     8000 + Math.random() * 4000 : // 8-12秒
                     12000 + Math.random() * 6000, // 12-18秒，增加隨機性
            isInitial: isInitial
        };

        this.particles.push(particleData);

        // 自動移除粒子並創建新粒子
        setTimeout(() => {
            this.removeParticle(particleData);
            // 移除粒子後，強制創建新的粒子來保持數量（使用箭頭函數保持this上下文）
            if (!isInitial) {
                // 立即檢查並創建新粒子
                setTimeout(() => {
                    if (this.particles.length < this.maxParticles) {
                        this.createOptimizedParticle(false);
                    }
                }, Math.random() * 1000); // 0-1秒後創建新粒子
            }
        }, particleData.maxLife);
        
        return particle;
    }

    removeParticle(particleData) {
        if (particleData.element && particleData.element.parentNode) {
            particleData.element.remove();
        }
        const index = this.particles.indexOf(particleData);
        if (index > -1) {
            this.particles.splice(index, 1);
        }
    }

    startParticleManagement() {
        // 更積極的粒子管理
        const manageParticles = () => {
            const now = Date.now();
            if (now - this.lastUpdateTime >= this.updateInterval) {
                // 強制檢查粒子數量，確保最少有一定數量的粒子
                const minParticles = Math.floor(this.maxParticles * 0.5); // 最少保持50%的粒子
                
                if (this.particles.length < minParticles) {
                    // 如果粒子數量太少，立即創建多個粒子
                    const createCount = Math.min(5, minParticles - this.particles.length);
                    for (let i = 0; i < createCount; i++) {
                        this.createOptimizedParticle(false);
                    }
                    console.log(`強制創建 ${createCount} 個粒子，當前數量: ${this.particles.length}`);
                }
                
                // 創建新粒子（大幅提高頻率，確保持續有粒子）
                if (this.particles.length < this.maxParticles && Math.random() < 0.9) { // 提高到90%
                    this.createOptimizedParticle(false);
                }
                
                // 清理粒子
                if (Math.random() < 0.05) { // 進一步降低清理頻率
                    this.cleanupParticles();
                }
                
                this.lastUpdateTime = now;
            }
            
            requestAnimationFrame(manageParticles);
        };
        
        requestAnimationFrame(manageParticles);
    }

    cleanupParticles() {
        const bounds = 300;
        const minParticles = Math.floor(this.maxParticles * 0.3); // 保持至少30%的粒子
        let cleanupCount = 0;
        
        // 創建要清理的粒子列表
        const particlesToClean = [];
        this.particles.forEach(particle => {
            if (!particle.isInitial &&
                (particle.x < -bounds || particle.x > window.innerWidth + bounds || 
                 particle.y < -bounds || particle.y > window.innerHeight + bounds)) {
                particlesToClean.push(particle);
            }
        });
        
        // 只清理部分超出邊界的粒子，確保不會讓總數過少
        particlesToClean.forEach(particle => {
            if (this.particles.length - cleanupCount > minParticles) {
                this.removeParticle(particle);
                cleanupCount++;
            }
        });
        
        if (cleanupCount > 0) {
            console.log(`清理了 ${cleanupCount} 個超出邊界的粒子，剩餘: ${this.particles.length}`);
        }
    }

    onResize() {
        // 簡化響應式調整
        this.particles.forEach(particle => {
            if (particle.x > window.innerWidth + 100) {
                particle.x = window.innerWidth - 50;
                if (particle.element) {
                    particle.element.style.left = particle.x + 'px';
                }
            }
        });
    }
    
    // 添加測試方法
    getParticleCount() {
        return this.particles.length;
    }
    
    // 強制創建測試粒子
    createTestParticles() {
        console.log('創建測試粒子...');
        for (let i = 0; i < 5; i++) {
            this.createOptimizedParticle(true);
        }
    }
}

// 輪播功能
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let slideInterval;

// 定義每個輪播對應的文字內容
const slideContent = [
    {
        title: "6月活動-超商儲值任務大挑戰",
        description: "完成超商儲值任務最高領取16,888元彩金，再送24,852總回饋！",
        link: "supermarket.html"
    },
    {
        title: "USDT 儲值優惠",
        description: "使用 USDT 通道充值享受額外優惠回饋2%！",
        link: "wu88usdt.html"
    },
    {
        title: "每日簽到彩金活動",
        description: "天天簽到領取豐富彩金，讓您每日都有驚喜收獲！",
        link: "cashback.html"
    },
    {
        title: "新會員好禮",
        description: "首儲贈送10%優惠，新會員專屬超值回饋等您領取！",
        link: "promotion.html"
    },
    {
        title: "VIP特權跳槽計畫",
        description: "VIP會員跳槽享最高回饋，專屬禮遇等您體驗！",
        link: "jumpother.html"
    },
    {
        title: "VIP 等級與福利詳情",
        description: "專屬 VIP 會員多重優惠，尊貴禮遇無限升級！",
        link: "vip.html"
    },
    {
        title: "推薦優惠活動",
        description: "介紹好友加入立即領取388元獎金，友情福利雙豐收！",
        link: "referral.html"
    },
    {
        title: "電子專屬優惠",
        description: "電子遊戲每日洗碼送，專屬優惠讓您贏得更多！",
        link: "solt.html"
    },
    {
        title: "週週續儲送 10%",
        description: "每週儲值享額外 10% 優惠，持續回饋不間斷！",
        link: "addpoint10.html"
    }
];

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });

    // 更新左側文字內容
    updateBannerText(index);

    // 更新指示點
    updateDots(index);
}

function updateBannerText(index) {
    const titleElement = document.getElementById('activity-title');
    const descriptionElement = document.getElementById('activity-description');
    const linkElement = document.getElementById('activity-link');
    
    if (titleElement && descriptionElement && linkElement && slideContent[index]) {
        const content = slideContent[index];
        
        // 添加淡出效果
        titleElement.style.opacity = '0';
        descriptionElement.style.opacity = '0';
        
        setTimeout(() => {
            titleElement.textContent = content.title;
            descriptionElement.textContent = content.description;
            linkElement.href = content.link;
            
            // 添加淡入效果
            titleElement.style.transition = 'opacity 0.5s ease';
            descriptionElement.style.transition = 'opacity 0.5s ease';
            titleElement.style.opacity = '1';
            descriptionElement.style.opacity = '1';
            
            // 添加文字更新時的發光效果
            titleElement.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
            setTimeout(() => {
                titleElement.style.textShadow = '';
            }, 500);
            
        }, 250);
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function changeSlide(direction) {
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
    resetInterval();
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

// 創建指示點
function createDots() {
    const dotContainer = document.querySelector('.dot-container');
    if (dotContainer) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active-dot');
            dot.addEventListener('click', () => {
                currentSlide = i;
                showSlide(currentSlide);
                resetInterval();
            });
            dotContainer.appendChild(dot);
        }
    }
}

function updateDots(activeIndex) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active-dot');
            } else {
            dot.classList.remove('active-dot');
            }
        });
    }

// 遊戲標籤切換功能
function initGameTabs() {
    const tabItems = document.querySelectorAll('.tab-item');
    const gameGrids = document.querySelectorAll('.game-grid');

    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // 移除所有活動狀態
            tabItems.forEach(t => t.classList.remove('active'));
            gameGrids.forEach(g => g.classList.remove('active'));
            
            // 添加活動狀態
            tab.classList.add('active');
            const targetGrid = document.querySelector(`.game-grid[data-content="${targetTab}"]`);
            if (targetGrid) {
                targetGrid.classList.add('active');
            }
        });
    });
}

// 遊戲按鈕點擊事件
function initGameButtons() {
    const gameButtons = document.querySelectorAll('.play-btn');
    const popup = document.getElementById('loginPopup');

    gameButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 顯示彈窗
            if (popup) {
                popup.classList.add('show');
                
                // 2秒後跳轉到登入頁面
            setTimeout(() => {
                    popup.classList.remove('show');
                    window.open('https://pc.wu88.live/?promotionId=SEO1689', '_blank');
            }, 2000);
            }
        });
    });
}

// 導航欄手機版切換
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const mobileAuthButtons = document.querySelector('.mobile-auth-buttons');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // 控制手機版登入註冊按鈕的顯示
            if (mobileAuthButtons) {
                if (navLinks.classList.contains('active')) {
                    mobileAuthButtons.style.display = 'flex';
                    setTimeout(() => {
                        mobileAuthButtons.style.opacity = '1';
                        mobileAuthButtons.style.transform = 'translateX(-50%) translateY(0)';
                    }, 300);
                } else {
                    mobileAuthButtons.style.opacity = '0';
                    mobileAuthButtons.style.transform = 'translateX(-50%) translateY(20px)';
                    setTimeout(() => {
                        mobileAuthButtons.style.display = 'none';
                    }, 300);
                }
            }
        });
    }
}

// 節流函數
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 優化後的滑鼠互動粒子效果
function createOptimizedMouseParticle(x, y) {
    const performance = new PerformanceDetector();
    if (performance.isLowPerformance || performance.reduceAnimations) return;
    
    const particle = document.createElement('div');
    particle.className = 'floating-particle tiny';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.animationDuration = '1.5s';
    
    const container = document.getElementById('global-particles-system');
    if (container && container.children.length < 60) { // 限制總數
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1500);
    }
}

// 優化後的點擊爆發效果
function createOptimizedClickBurst(x, y) {
    const performance = new PerformanceDetector();
    if (performance.isLowPerformance || performance.reduceAnimations) return;
    
    const burstCount = 2; // 減少到2個粒子
    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'floating-particle small';
            
            const angle = (i / burstCount) * Math.PI * 2;
            const distance = 15 + Math.random() * 10;
            const particleX = x + Math.cos(angle) * distance;
            const particleY = y + Math.sin(angle) * distance;
            
            particle.style.left = particleX + 'px';
            particle.style.top = particleY + 'px';
            particle.style.animationDuration = '0.8s';
            
            const container = document.getElementById('global-particles-system');
            if (container && container.children.length < 60) {
                container.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 800);
            }
        }, i * 20);
    }
}

// 統計數據計數器動畫
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    console.log(`找到 ${counters.length} 個計數器元素`); // 調試信息
    
    // 檢查元素是否存在
    if (counters.length === 0) {
        console.warn('未找到計數器元素，可能頁面還未完全載入');
        return;
    }

    const options = {
        threshold: 0.1, // 降低閾值，更容易觸發
        rootMargin: '0px 0px -20px 0px' // 減少邊距
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-count'));
                console.log(`開始計數動畫：目標值 ${target}`); // 調試信息
                
                const duration = 2000; // 動畫持續時間（毫秒）
                const startTime = performance.now();
                let current = 0;
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // 使用緩動函數讓動畫更流暢
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    current = target * easeOutQuart;
                    
                    // 根據數據類型設置顯示格式
                    if (target === 99.9) {
                        counter.textContent = current.toFixed(1);
                    } else if (target >= 1000) {
                        counter.textContent = Math.floor(current).toLocaleString();
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        // 確保最終顯示正確的目標值
                        if (target === 99.9) {
                            counter.textContent = target.toFixed(1);
                        } else if (target >= 1000) {
                            counter.textContent = Math.floor(target).toLocaleString();
                        } else {
                            counter.textContent = Math.floor(target);
                        }
                        console.log(`計數動畫完成：${target}`); // 調試信息
                    }
                };
                
                updateCounter(startTime);
                observer.unobserve(counter);
            }
        });
    }, options);

    // 如果 Intersection Observer 不支援，直接開始動畫
    if (!window.IntersectionObserver) {
        console.log('Intersection Observer 不支援，直接開始動畫');
        startCountersDirectly();
        return;
    }

    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    // 備用方案：3秒後如果還沒有動畫，直接開始
    setTimeout(() => {
        counters.forEach(counter => {
            if (counter.textContent === '0') {
                console.log('備用方案：直接開始計數器動畫');
                startCountersDirectly();
            }
        });
    }, 3000);
}

// 直接開始計數器動畫的備用函數
function startCountersDirectly() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach((counter, index) => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();
        
        // 給每個計數器添加延遲，讓它們依次動畫
        setTimeout(() => {
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = target * easeOutQuart;
                
                if (target === 99.9) {
                    counter.textContent = current.toFixed(1);
                } else if (target >= 1000) {
                    counter.textContent = Math.floor(current).toLocaleString();
                } else {
                    counter.textContent = Math.floor(current);
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target === 99.9) {
                        counter.textContent = target.toFixed(1);
                    } else if (target >= 1000) {
                        counter.textContent = Math.floor(target).toLocaleString();
                    } else {
                        counter.textContent = Math.floor(target);
                    }
                }
            };
            
            updateCounter(startTime);
        }, index * 200); // 每個計數器延遲200ms
    });
}

// 初始化增強型Banner系統和全域功能
document.addEventListener('DOMContentLoaded', () => {
    console.log('頁面載入完成，開始初始化...'); // 調試信息
    
    // 初始化優化後的粒子系統
    let globalParticleSystem;
    try {
        globalParticleSystem = new OptimizedGlobalParticleSystem();
        
        // 檢查粒子系統是否正確初始化
        setTimeout(() => {
            if (globalParticleSystem && globalParticleSystem.container) {
                const particleCount = globalParticleSystem.getParticleCount();
                console.log(`粒子系統狀態檢查: 已創建 ${particleCount} 個粒子`);
                
                if (particleCount === 0) {
                    console.log('未檢測到粒子，嘗試創建測試粒子...');
                    globalParticleSystem.createTestParticles();
                }
            } else {
                console.log('粒子系統初始化失敗，嘗試重新創建...');
                setTimeout(() => {
                    globalParticleSystem = new OptimizedGlobalParticleSystem();
                }, 1000);
            }
        }, 2000); // 2秒後檢查
        
    } catch (error) {
        console.error('粒子系統初始化錯誤:', error);
    }
    
    // 響應式調整（使用節流）
    window.addEventListener('resize', throttle(() => {
        if (globalParticleSystem && globalParticleSystem.onResize) {
            globalParticleSystem.onResize();
        }
        if (window.enhancedBanner) {
            window.enhancedBanner.updateProgressBar();
        }
    }, 250));

    // 確保在DOM完全載入後初始化Banner系統
    setTimeout(() => {
        const bannerSection = document.querySelector('.banner-section');
        if (bannerSection) {
            // 🔥 先停止舊的輪播間隔，避免衝突
            if (typeof slideInterval !== 'undefined' && slideInterval) {
                clearInterval(slideInterval);
            }
            
            window.enhancedBanner = new EnhancedBannerSystem();
            console.log('🌟 Enhanced Banner System Initialized');
            
            // 🔥 禁用舊的輪播系統自動播放
            window.legacySliderDisabled = true;
        }
    }, 100);

    // 初始化其他功能
    initGameTabs();
    initGameButtons();
    initMobileMenu();
    
    // 初始化文章相關功能
    initArticleFilters();
    initLoadMoreArticles();
    initArticleCardEffects();
    initFeaturedArticleEffects();
    initArticleScrollAnimations();

    // 為輪播圖片連結添加點擊事件
    document.querySelectorAll('.slide-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // 讓連結正常工作，不需要特殊處理
    });
});

    // 平滑滾動效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 優化後的滑鼠移動事件（提高機率讓效果更明顯）
    const throttledMouseMove = throttle((e) => {
        if (Math.random() < 0.05) { // 提高到5%機率
            createOptimizedMouseParticle(e.clientX, e.clientY);
        }
    }, 500); // 減少節流時間

    document.addEventListener('mousemove', throttledMouseMove);

    // 優化後的點擊事件（節流）
    const throttledClick = throttle((e) => {
        createOptimizedClickBurst(e.clientX, e.clientY);
    }, 300); // 減少節流時間

    document.addEventListener('click', throttledClick);
    

    
    // 添加粒子數量實時監控（開發調試用）
    if (window.location.search.includes('debug') || window.location.hostname === 'localhost') {
        setInterval(() => {
            if (globalParticleSystem) {
                const count = globalParticleSystem.getParticleCount();
                console.log(`當前粒子數量: ${count}/${globalParticleSystem.maxParticles}`);
                
                // 如果粒子數量為0，顯示警告
                if (count === 0) {
                    console.warn('⚠️ 所有粒子已消失！');
                }
            }
        }, 3000); // 每3秒檢查一次
    }
    
    // 確保統計數據區塊完全載入後再開始動畫
    const checkAndStartCounters = () => {
        const featuresStats = document.querySelector('.features-stats');
        if (featuresStats) {
            console.log('統計數據區塊已找到，開始初始化計數器動畫');
            setTimeout(animateCounters, 500);
        } else {
            console.log('統計數據區塊未找到，1秒後重試');
            setTimeout(checkAndStartCounters, 1000);
        }
    };
    
    checkAndStartCounters();
    

    
    console.log('所有初始化完成');
}); 

// FAQ 功能
function initFAQ() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');

    // 分類標籤切換功能
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有標籤的active類
            categoryTabs.forEach(t => t.classList.remove('active'));
            // 添加當前標籤的active類
            tab.classList.add('active');

            const selectedCategory = tab.getAttribute('data-category');
            
            // 過濾FAQ項目
            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                    item.style.display = 'block';
                    item.classList.add('show');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('show');
                }
            });
        });
    });

    // FAQ展開/收合功能
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const toggleIcon = question.querySelector('.toggle-icon i');

            // 切換展開狀態
            faqItem.classList.toggle('active');

            // 動畫效果
            if (faqItem.classList.contains('active')) {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                toggleIcon.style.transform = 'rotate(180deg)';
            } else {
                faqAnswer.style.maxHeight = '0';
                toggleIcon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // 設置初始狀態
    faqItems.forEach(item => {
        const faqAnswer = item.querySelector('.faq-answer');
        faqAnswer.style.maxHeight = '0';
        faqAnswer.style.overflow = 'hidden';
        faqAnswer.style.transition = 'max-height 0.3s ease';
        
        // 預設顯示"帳戶相關"分類的FAQ項目
        const itemCategory = item.getAttribute('data-category');
        if (itemCategory === 'account') {
            item.style.display = 'block';
            item.classList.add('show');
        } else {
            item.style.display = 'none';
            item.classList.remove('show');
        }
    });

    // 設置toggle圖標的初始轉換效果
    document.querySelectorAll('.toggle-icon i').forEach(icon => {
        icon.style.transition = 'transform 0.3s ease';
    });
}

// 在DOM加載完成後初始化FAQ
document.addEventListener('DOMContentLoaded', () => {
    // 檢查FAQ區域是否存在
    if (document.querySelector('.faq-section')) {
        initFAQ();
        console.log('FAQ功能已初始化');
    }
}); 