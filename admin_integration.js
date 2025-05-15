// Скрипт за интеграция с админ панела
document.addEventListener('DOMContentLoaded', function() {
    // Проверка дали има данни от админ панела
    function getDataFromAdmin(dataType) {
        return JSON.parse(localStorage.getItem(dataType + 'Items') || '[]');
    }

    // Функция за показване на новини на страницата news.html
    function displayNews() {
        if (window.location.pathname.includes('news.html')) {
            const newsContainer = document.querySelector('.news-container') || document.getElementById('news-content');
            if (newsContainer) {
                const newsItems = getDataFromAdmin('news');
                
                if (newsItems.length === 0) {
                    // Ако няма добавени новини от админ панела, показваме изчакващо съобщение
                    newsContainer.innerHTML = '<p>Няма добавени новини.</p>';
                    return;
                }
                
                // Сортираме новините по дата (най-новите първи)
                newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                let newsHTML = '';
                newsItems.forEach(item => {
                    const formattedDate = new Date(item.date).toLocaleDateString('bg-BG');
                    newsHTML += `
                        <div class="news-item">
                            <div class="news-date">${formattedDate}</div>
                            <div class="news-title"><h3>${item.title}</h3></div>
                            ${item.image ? `<div class="news-image"><img src="${item.image}" alt="${item.title}"></div>` : ''}
                            <div class="news-content">
                                <p>${item.content}</p>
                            </div>
                        </div>
                    `;
                });
                
                newsContainer.innerHTML = newsHTML;
            }
        }
    }

    // Функция за показване на времето на страницата weather.html
    function displayWeather() {
        if (window.location.pathname.includes('weather.html')) {
            const weatherContainer = document.querySelector('.weather-container') || document.getElementById('weather-content');
            if (weatherContainer) {
                const weatherItems = getDataFromAdmin('weather');
                
                if (weatherItems.length === 0) {
                    // Ако няма добавени прогнози от админ панела, показваме изчакващо съобщение
                    weatherContainer.innerHTML = '<p>Няма добавени прогнози за времето.</p>';
                    return;
                }
                
                // Сортираме прогнозите по дата (най-новите първи)
                weatherItems.sort((a, b) => new Date(a.date) - new Date(b.date));
                
                let weatherHTML = '<div class="weather-forecast">';
                weatherItems.forEach(item => {
                    const formattedDate = new Date(item.date).toLocaleDateString('bg-BG', { weekday: 'long', day: 'numeric', month: 'long' });
                    weatherHTML += `
                        <div class="weather-day">
                            <div class="weather-date">${formattedDate}</div>
                            ${item.icon ? `<div class="weather-icon"><img src="${item.icon}" alt="${item.condition}"></div>` : ''}
                            <div class="weather-temp">${item.temp}°C</div>
                            <div class="weather-condition">${item.condition}</div>
                        </div>
                    `;
                });
                weatherHTML += '</div>';
                
                weatherContainer.innerHTML = weatherHTML;
            }
        }
    }

    // Функция за показване на празници на страницата holiday.html
    function displayHolidays() {
        if (window.location.pathname.includes('holiday.html')) {
            const holidayContainer = document.querySelector('.holiday-container') || document.getElementById('holiday-content');
            if (holidayContainer) {
                const holidayItems = getDataFromAdmin('holiday');
                
                if (holidayItems.length === 0) {
                    // Ако няма добавени празници от админ панела, показваме изчакващо съобщение
                    holidayContainer.innerHTML = '<p>Няма добавени празници.</p>';
                    return;
                }
                
                // Сортираме празниците по дата
                holidayItems.sort((a, b) => new Date(a.date) - new Date(b.date));
                
                let holidayHTML = '';
                holidayItems.forEach(item => {
                    const formattedDate = new Date(item.date).toLocaleDateString('bg-BG', { day: 'numeric', month: 'long' });
                    holidayHTML += `
                        <div class="holiday-item">
                            <h3>${item.name}</h3>
                            <div class="holiday-date">${formattedDate}</div>
                            ${item.image ? `<div class="holiday-image"><img src="${item.image}" alt="${item.name}"></div>` : ''}
                            <div class="holiday-description">
                                <p>${item.description}</p>
                            </div>
                        </div>
                    `;
                });
                
                holidayContainer.innerHTML = holidayHTML;
            }
        }
    }

    // Функция за показване на членове на екипа на страницата team.html
    function displayTeam() {
        if (window.location.pathname.includes('team.html')) {
            const teamContainer = document.querySelector('.team-container') || document.getElementById('team-content');
            if (teamContainer) {
                const teamItems = getDataFromAdmin('team');
                
                if (teamItems.length === 0) {
                    // Ако няма добавени членове на екипа от админ панела, показваме изчакващо съобщение
                    teamContainer.innerHTML = '<p>Няма добавени членове на екипа.</p>';
                    return;
                }
                
                let teamHTML = '';
                teamItems.forEach(item => {
                    teamHTML += `
                        <div class="team-member">
                            ${item.image ? `<div class="member-photo"><img src="${item.image}" alt="${item.name}"></div>` : ''}
                            <div class="member-info">
                                <h3>${item.name}</h3>
                                <div class="member-position">${item.position}</div>
                                ${item.bio ? `<div class="member-bio"><p>${item.bio}</p></div>` : ''}
                            </div>
                        </div>
                    `;
                });
                
                teamContainer.innerHTML = teamHTML;
            }
        }
    }

    // Добавяне на админ бутон в навигацията
    function addAdminButton() {
        const nav = document.querySelector('nav ul');
        if (nav) {
            // Проверяваме дали вече няма админ бутон
            const existingAdminLink = nav.querySelector('a[href="admin.html"]');
            if (!existingAdminLink) {
                const adminLi = document.createElement('li');
                adminLi.innerHTML = '<a href="admin.html">Админ</a>';
                nav.appendChild(adminLi);
            }
        }
    }

    // Функция за показване на последните новини на началната страница
    function displayLatestNews() {
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
            const latestNewsContainer = document.querySelector('.latest-news') || document.getElementById('latest-news');
            if (latestNewsContainer) {
                const newsItems = getDataFromAdmin('news');
                
                if (newsItems.length === 0) {
                    return;
                }
                
                // Сортираме новините по дата (най-новите първи) и вземаме първите 3
                newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));
                const latestNews = newsItems.slice(0, 3);
                
                let newsHTML = '<h2>Последни новини</h2>';
                latestNews.forEach(item => {
                    const formattedDate = new Date(item.date).toLocaleDateString('bg-BG');
                    newsHTML += `
                        <div class="news-preview">
                            <div class="news-date">${formattedDate}</div>
                            <h3>${item.title}</h3>
                            <p>${item.content.substring(0, 100)}...</p>
                            <a href="news.html" class="read-more">Прочети повече</a>
                        </div>
                    `;
                });
                
                latestNewsContainer.innerHTML = newsHTML;
            }
        }
    }

    // Функция за показване на текущата прогноза на началната страница
    function displayCurrentWeather() {
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
            const currentWeatherContainer = document.querySelector('.current-weather') || document.getElementById('current-weather');
            if (currentWeatherContainer) {
                const weatherItems = getDataFromAdmin('weather');
                
                if (weatherItems.length === 0) {
                    return;
                }
                
                // Намираме прогнозата за днес или за най-близката дата
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                // Сортираме прогнозите по дата
                weatherItems.sort((a, b) => new Date(a.date) - new Date(b.date));
                
                // Намираме прогнозата за днес или за най-близката бъдеща дата
                let closestWeather = null;
                let minDiff = Infinity;
                
                weatherItems.forEach(item => {
                    const itemDate = new Date(item.date);
                    itemDate.setHours(0, 0, 0, 0);
                    const diff = Math.abs(itemDate - today);
                    
                    if (diff < minDiff) {
                        minDiff = diff;
                        closestWeather = item;
                    }
                });
                
                if (closestWeather) {
                    const formattedDate = new Date(closestWeather.date).toLocaleDateString('bg-BG', { weekday: 'long', day: 'numeric', month: 'long' });
                    const weatherHTML = `
                        <h2>Времето днес</h2>
                        <div class="weather-info">
                            <div class="weather-date">${formattedDate}</div>
                            ${closestWeather.icon ? `<div class="weather-icon"><img src="${closestWeather.icon}" alt="${closestWeather.condition}"></div>` : ''}
                            <div class="weather-temp">${closestWeather.temp}°C</div>
                            <div class="weather-condition">${closestWeather.condition}</div>
                            <a href="weather.html" class="view-forecast">Виж прогнозата</a>
                        </div>
                    `;
                    
                    currentWeatherContainer.innerHTML = weatherHTML;
                }
            }
        }
    }

    // Изпълняваме функциите според текущата страница
    displayNews();
    displayWeather();
    displayHolidays();
    displayTeam();
    displayLatestNews();
    displayCurrentWeather();
    
    // Добавяме админ бутон в навигацията
    addAdminButton();
});
