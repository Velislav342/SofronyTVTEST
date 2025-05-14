document.addEventListener('DOMContentLoaded', function() {
    // Мобилно меню функционалност
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Затваряне на мобилното меню при кликване върху връзка в навигацията
    const navLinks = document.querySelectorAll('nav a');
    
    // Анимирани преходи между секциите
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Вземаме ID на целевата секция от href атрибута
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Създаваме overlay елемент за анимацията
                const overlay = document.createElement('div');
                overlay.className = 'page-transition-overlay';
                document.body.appendChild(overlay);
                
                // Анимираме overlay елемента
                setTimeout(() => {
                    overlay.classList.add('active');
                }, 50);
                
                // След като анимацията приключи, превъртаме до целевата секция и премахваме overlay
                setTimeout(() => {
                    // Скролваме до целевата секция
                    targetSection.scrollIntoView({
                        behavior: 'auto'
                    });
                    
                    // Добавяме анимация за появата на секцията
                    targetSection.classList.add('section-animate');
                    
                    // Премахваме overlay след като скролнем
                    setTimeout(() => {
                        overlay.classList.remove('active');
                        setTimeout(() => {
                            document.body.removeChild(overlay);
                        }, 500);
                    }, 300);
                    
                    // Затваряне на мобилното меню ако е на малък екран
                    if (window.innerWidth <= 768 && menu) {
                        menu.classList.remove('active');
                    }
                }, 500);
            }
        });
    });
    
    // Скриване и показване на "Връщане в началото" бутона
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'flex';
                backToTopButton.classList.add('back-to-top-visible');
            } else {
                backToTopButton.classList.remove('back-to-top-visible');
                setTimeout(() => {
                    if (!backToTopButton.classList.contains('back-to-top-visible')) {
                        backToTopButton.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Анимиран преход за "Връщане в началото" бутона
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Създаваме overlay елемент за анимацията
            const overlay = document.createElement('div');
            overlay.className = 'page-transition-overlay';
            document.body.appendChild(overlay);
            
            // Анимираме overlay елемента
            setTimeout(() => {
                overlay.classList.add('active');
            }, 50);
            
            // След кратко забавяне скролваме в началото
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'auto'
                });
                
                // Премахваме overlay след като скролнем
                setTimeout(() => {
                    overlay.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                    }, 500);
                }, 300);
            }, 500);
        });
        
        // Първоначално скриване на бутона
        backToTopButton.style.display = 'none';
    }
    
    // Анимация при първоначално зареждане на страницата
    document.body.classList.add('page-loaded');
    
    // Добавяме анимации за появяване на секциите при скролване
    const allSections = document.querySelectorAll('section');
    
    // Функция за проверка дали елемент е видим във viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Функция за анимиране на видимите секции
    function animateSectionsOnScroll() {
        allSections.forEach(section => {
            if (isElementInViewport(section) && !section.classList.contains('section-visible')) {
                section.classList.add('section-visible');
            }
        });
    }
    
    // Извикваме функцията при скролване
    window.addEventListener('scroll', animateSectionsOnScroll);
    
    // Извикваме функцията и при първоначално зареждане
    animateSectionsOnScroll();
});