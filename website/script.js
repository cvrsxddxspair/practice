/**
 * LifeGuard - Скрипт для управления навигацией и переключением страниц
 */

// ============================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    setupEventListeners();
});

// ============================================
// ФУНКЦИИ НАВИГАЦИИ
// ============================================

/**
 * Инициализирует навигацию и устанавливает активную страницу
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Получаем название страницы
            const pageName = this.getAttribute('data-page');
            navigateTo(pageName);
        });
    });
}

/**
 * Переходит на указанную страницу
 * @param {string} pageName - Название страницы для перехода
 */
function navigateTo(pageName) {
    // Скрываем все страницы
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Показываем нужную страницу
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Прокручиваем страницу вверх
        window.scrollTo(0, 0);
    }
    
    // Обновляем активный элемент в меню
    updateActiveNavLink(pageName);
}

/**
 * Обновляет активный элемент в навигационном меню
 * @param {string} pageName - Название активной страницы
 */
function updateActiveNavLink(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
}

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ СОБЫТИЯ
// ============================================

/**
 * Устанавливает дополнительные обработчики событий
 */
function setupEventListeners() {
    // Обработчик для кликов на внешние ссылки в ресурсах
    const resourceLinks = document.querySelectorAll('.resource-list a');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Позволяем стандартное поведение для внешних ссылок
            if (!this.href.startsWith('#')) {
                // Опционально: можем добавить логирование кликов
                trackExternalLink(this.href);
            }
        });
    });
    
    // Обработчик для навигационных ссылок в héро секции
    const heroCtas = document.querySelectorAll('.hero-content button');
    heroCtas.forEach(btn => {
        btn.addEventListener('click', function() {
            const page = this.getAttribute('onclick').match(/navigateTo\('([^']+)'\)/)[1];
            navigateTo(page);
        });
    });
}

/**
 * Отслеживает клики по внешним ссылкам
 * @param {string} url - URL для отслеживания
 */
function trackExternalLink(url) {
    // Этот функционал может быть расширен для аналитики
    console.log('Переход на внешний ресурс:', url);
}

// ============================================
// УТИЛИТЫ
// ============================================

/**
 * Получает текущую активную страницу
 * @returns {string} Название активной страницы
 */
function getCurrentPage() {
    const activePage = document.querySelector('.page.active');
    return activePage ? activePage.id : 'home';
}

/**
 * Проверяет, видима ли страница
 * @param {string} pageName - Название страницы для проверки
 * @returns {boolean} True, если страница видима
 */
function isPageActive(pageName) {
    return getCurrentPage() === pageName;
}

// ============================================
// ИНТЕГРАЦИЯ С ИСТОРИЕЙ БРАУЗЕРА
// ============================================

/**
 * Обновляет URL и историю браузера при переходе на новую страницу
 * (Опционально: раскомментируйте, если нужна поддержка URL маршрутизации)
 */
function initializeHistorySupport() {
    // Слушаем события popstate для кнопок браузера "назад/вперед"
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.page) {
            // Переходим на страницу без добавления новой записи в историю
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            const page = document.getElementById(e.state.page);
            if (page) {
                page.classList.add('active');
                updateActiveNavLink(e.state.page);
            }
        }
    });
}

// ============================================
// ПРОИЗВОДИТЕЛЬНОСТЬ И ОПТИМИЗАЦИЯ
// ============================================

/**
 * Кэширует элементы DOM для оптимизации производительности
 */
const domCache = {
    pages: document.querySelectorAll('.page'),
    navLinks: document.querySelectorAll('.nav-link'),
    mainContent: document.querySelector('.main-content')
};

/**
 * Инициализирует отложенную загрузку контента (если нужна в будущем)
 */
function initializeLazyLoading() {
    // Этот функционал может быть добавлен для оптимизации загрузки изображений
    if ('IntersectionObserver' in window) {
        // Реализация LazyLoading через IntersectionObserver
        console.log('IntersectionObserver доступен');
    }
}

// ============================================
// ЭКСПОРТ ФУНКЦИЙ (для использования в HTML)
// ============================================

// Функция navigateTo уже доступна в глобальной области видимости
window.navigateTo = navigateTo;