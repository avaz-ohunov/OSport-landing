// main.js

'use strict';


// Навигация и бургер кнопка
const menuIcon = document.querySelector('#header-menu-icon');
const navbar = document.querySelector('.header-navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


// Открытие и закрытие карточек с клиентами
const clients = ['student', 'employee', 'sportsman'];
let previousClientOpenCard = null;

for(let client of clients) {
    const clientCard = document.getElementById(client);
    const clientsCardInner = document.querySelector(
        `#${client} .clients-card-inner`
    );
    
    clientCard.onclick = () => {
        // Если предыдущая карта открыта, то переворачиваем её в исходное состояние
        if(previousClientOpenCard) {
            document.getElementById(previousClientOpenCard)
                .classList.remove('opened');
            
            document.querySelector(
                `#${previousClientOpenCard} .clients-card-inner`
            ).style.transform = 'rotateY(0deg)';
        }
        
        // Если карта по которой кликнули не та же, что предыдущая, открываем её
        if(previousClientOpenCard !== clientCard.id) {
            clientCard.classList.add('opened');
            clientsCardInner.style.transform = 'rotateY(180deg)';
            previousClientOpenCard = clientCard.id;
        } else {
            previousClientOpenCard = null;
        }
    }
}


// видеоплеер plyr
const player = new Plyr('#plyr', {
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions'],
    captions: {active: true},
    muted: true,  
    autoplay: true 
});
window.player = player;

// Отслеживание видимости видео
function handleVideoPlayback(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Если видео в зоне видимости
            player.muted = false;  
            player.volume = 0.25;  
            if (player.paused) {
                player.play();  
            }
        } else {
            // Если видео ушло из зоны видимости
            player.pause();  
        }
    });
}

// Настройка IntersectionObserver
const observerOptions = {
    root: null,  
    threshold: 0.5 
};

// Отслеживание секции с видео
const videoSection = document.querySelector('#technology');  // Блок с видео
const observer = new IntersectionObserver(handleVideoPlayback, observerOptions);
observer.observe(videoSection); 



// Пагинация соревнований
const cards = document.querySelectorAll('.competitions-card');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
const cardsBlock = document.querySelector('.cards-block');

let currentPage = 0;
const cardsPerPage = 3;
const totalPages = Math.ceil(cards.length / cardsPerPage);

// Функция для отображения карточек на текущей странице
function showPage(page) {
    cards.forEach((card, index) => {
        if (index >= page * cardsPerPage && index < (page + 1) * cardsPerPage) {
            card.style.display = 'flex';  // Показываем карточку
        } else {
            card.style.display = 'none';  // Скрываем карточку
        }
    });

    if(cards.length <= 3) {
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
        return
    }

    // Обновление состояния стрелок
    if (page === 0) {
        leftArrow.classList.add('arrow-disabled');
    } else {
        leftArrow.classList.remove('arrow-disabled');
    }

    if (page === totalPages - 1) {
        rightArrow.classList.add('arrow-disabled');
    } else {
        rightArrow.classList.remove('arrow-disabled');
    }
}

// Обработчики для стрелок
leftArrow.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        cards.forEach((card) => card.style.animation = 'show-with-left 0.3s linear');
        showPage(currentPage);
    }
});

rightArrow.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        cards.forEach((card) => card.style.animation = 'show-with-right 0.3s linear');
        showPage(currentPage);
    }
});

// Инициализация отображения первой страницы
showPage(currentPage);


// Открытие и закрытие карточек с соревнованиями
const competitions = document.querySelectorAll('.competitions-card');
let previousCompetitionsOpenCard = null;

for(let comp of competitions) {
    let competition = comp.id;
    const competitionCard = document.getElementById(competition);
    const competitionsCardInner = document.querySelector(
        `#${competition} .competitions-card-inner`
    );
    
    competitionCard.onclick = () => {
        // Если предыдущая карта открыта, то переворачиваем её в исходное состояние
        if(previousCompetitionsOpenCard) {
            document.getElementById(previousCompetitionsOpenCard)
                .classList.remove('opened');
            
            document.querySelector(
                `#${previousCompetitionsOpenCard} .competitions-card-inner`
            ).style.transform = 'rotateY(0deg)';
        }
        
        // Если карта по которой кликнули не та же, что предыдущая, открываем её
        if(previousCompetitionsOpenCard !== competitionCard.id) {
            competitionCard.classList.add('opened');
            competitionsCardInner.style.transform = 'rotateY(180deg)';
            previousCompetitionsOpenCard = competitionCard.id;
        } else {
            previousCompetitionsOpenCard = null;
        }
    }
}


const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const icon = question.querySelector('.icon');

    question.addEventListener('click', () => {
        // Переключаем класс "active"
        item.classList.toggle('active');

        // Меняем SVG
        if (item.classList.contains('active')) {
            icon.src = "media/svg/krestik.svg"; // Меняем на крестик
            icon.classList.add('krestik'); // Добавляем класс для поворота
        } else {
            icon.src = "media/svg/plus.svg"; // Меняем на плюс
            icon.classList.remove('krestik'); // Убираем поворот
        }
    });
});

// Функция плавной смены изображения
function changeArrowImageSmoothly(arrow, newSrc) {
    const tempImg = new Image();
    tempImg.src = newSrc;

    tempImg.onload = () => {
        arrow.src = newSrc;
    };
}

// Универсальная функция наблюдателя
function createObserver(targetSelector, textSelector, arrowSelector, buttonSelector, srcBlack, srcBlue) {
    const target = document.querySelector(targetSelector);
    const text = document.querySelector(textSelector);
    const arrows = document.querySelectorAll(arrowSelector);
    const button = document.querySelector(buttonSelector);

    const options = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',  // Центр экрана
        threshold: 0
    };

    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateSection(target, text, arrows, button, srcBlack);
            } else {
                deactivateSection(target, text, arrows, button, srcBlue);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);
}

// Активация секции
function activateSection(section, text, arrows, button, srcBlack) {
    section.style.backgroundColor = 'var(--color-blue)';
    text.style.color = 'white';

    arrows.forEach(arrow => {
        changeArrowImageSmoothly(arrow, srcBlack);
    });

    button.style.backgroundImage = `url("media/svg/black-rectangle.svg")`;
}

// Деактивация секции
function deactivateSection(section, text, arrows, button, srcBlue) {
    section.style.backgroundColor = 'white';
    text.style.color = 'black';

    arrows.forEach(arrow => {
        changeArrowImageSmoothly(arrow, srcBlue);
    });

    button.style.backgroundImage = `url("media/svg/green-rectangle.svg")`;
}

// Запуск всех наблюдателей при загрузке страницы
window.addEventListener('load', () => {
    createObserver('.blue-rectangle', '.tg-bot-text', '.arrow-img', '.green-button', 
        'media/svg/right-arrow-black.svg', 'media/svg/right-arrow-blue.svg');

    createObserver('.blue-rectangle-left', '.mobile-app-text', '.arrow-img-left', '.green-button-left', 
        'media/svg/right-arrow-black.svg', 'media/svg/right-arrow-blue.svg');

    createObserver('.blue-rectangle-below-laptop', '.digital-judging-text', '.arrow-img-below-laptop', 
        '.green-button-below-laptop', 'media/svg/right-arrow-black.svg', 'media/svg/right-arrow-blue.svg');
});
