export { $arenas, $formFight, $randomButton, createElement, createRandomNumber,
        playerWin, getTime, createReloadButton, writeWinTitle };


const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $randomButton = document.querySelector('.button');

function createElement(tag, className){
    // создать элемент, добавить класс при необходимости
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className)
    }

    return $tag;
}


const writeWinTitle = (name) => $arenas.appendChild(playerWin(name));

const getRandom = (number) =>  Math.ceil(Math.random() * number);

//либо ты перепишешь функцию createRandomNumber что бы эта функция использовала не ceil а floor например)
//или напиши новую которая будет принимать значения от min до max
const createRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function playerWin(name){
    // победитель
    const $winTitle = createElement('div', 'winTitle');
    if (name) {
        $winTitle.innerText = `${name} wins`;
    } else {
        $winTitle.innerText = 'draw';
    }
    return $winTitle;
}


function getCorrectTime(time){
    if (time < 10) {
        return `0${time}`;
    } else {
        return time;
    }
}

const getTime = () => {
    let time = new Date();
    return `${getCorrectTime(time.getHours())}:${getCorrectTime(time.getMinutes())}`;
}


function createReloadButton(){
    const $divReloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';

    $divReloadWrap.appendChild($button);
    $arenas.appendChild($divReloadWrap);

    $button.addEventListener('click', function() {
        window.location.reload();
    });
}



