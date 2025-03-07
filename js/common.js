// 更新状态栏时间
function updateStatusBarTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // 格式化时间为两位数
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    const timeString = `${hours}:${minutes}`;
    
    // 更新所有状态栏时间元素
    const timeElements = document.querySelectorAll('.status-time');
    timeElements.forEach(element => {
        element.textContent = timeString;
    });
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 更新状态栏时间
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000); // 每分钟更新一次
    
    // 设置底部导航栏活动项
    setActiveTab();
    
    // 添加页面过渡动画
    document.body.classList.add('fade-in');
});

// 设置底部导航栏活动项
function setActiveTab() {
    const currentPage = window.location.pathname.split('/').pop();
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(item => {
        item.classList.remove('active');
        
        const itemLink = item.getAttribute('data-page');
        if (currentPage === itemLink || 
            (currentPage === '' && itemLink === 'home.html') || 
            (currentPage === 'index.html' && itemLink === 'home.html')) {
            item.classList.add('active');
        }
    });
}

// 页面导航
function navigateTo(page) {
    window.location.href = page;
}

// 显示加载指示器
function showLoading() {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading-indicator';
    loadingElement.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingElement);
    
    return loadingElement;
}

// 隐藏加载指示器
function hideLoading(loadingElement) {
    if (loadingElement && loadingElement.parentNode) {
        loadingElement.parentNode.removeChild(loadingElement);
    }
}

// 模拟AI分析过程
function simulateAIAnalysis(callback, delay = 2000) {
    const loading = showLoading();
    
    setTimeout(() => {
        hideLoading(loading);
        if (typeof callback === 'function') {
            callback();
        }
    }, delay);
}

// 显示提示消息
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
} 