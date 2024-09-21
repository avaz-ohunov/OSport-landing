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


// Видео-плеер plyr
const player = new Plyr('#plyr', {captions: {active: true}});
window.player = player;


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
