export { player1, player2, createPlayer, enemyAttack, playerAttack, showResult };
import { $formFight, $randomButton, createElement, createRandomNumber,
            createReloadButton, writeWinTitle } from './utils.js';
import { generateLogs } from './logs.js';


const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Kunai', 'Axe', 'Ninja Sword'],
    changeHP,
    elHP,
    renderHP,
    attack: function() {
        console.log(`${this.name} Fight...`);
    }
};


const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Kori Blade', 'Hummer'],
    changeHP,
    elHP,
    renderHP,
        attack: function() {
        console.log(`${this.name} Fight...`);
    }
};


function createPlayer(player) {
    // создание игрока

    const { player: playerNum, name, hp, img } = player;

    const $div = createElement('div', 'player'+  playerNum);
    const $divProgressbar = createElement('div', 'progressbar');
    const $divCharacter = createElement('div', 'character');
    const $divLife = createElement('div', 'life');
    const $divName = createElement('div', 'name');
    const $img = createElement('img');

    $divLife.style.width = hp + '%';
    $divName.innerText = name;
    $img.src =  img;

    $divProgressbar.appendChild($divLife);
    $divProgressbar.appendChild($divName);

    $divCharacter.appendChild($img);

    $div.appendChild($divProgressbar);
    $div.appendChild($divCharacter);

    return $div;
}


function changeHP(hp) {
    if (this.hp <= hp) {
        this.hp = 0;
    } else {
        this.hp -= hp;
    }
}


function elHP() {
    return document.querySelector(`.player${this.player} .life`);
}


function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}


function enemyAttack(){
    // удар противника
    const hit = ATTACK[createRandomNumber(0, ATTACK.length)];  // куда бить
    const defence = ATTACK[createRandomNumber(0, ATTACK.length)]; // что защищать

    return {
        value: createRandomNumber(1, HIT[hit] + 1),
        hit,
        defence,
    }
}


function playerAttack(){
    const attack = {};

    for (let item of $formFight){
        if (item.checked && item.name === 'hit'){
            attack.value = createRandomNumber(1, HIT[item.value] + 1);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence'){
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}


function showResult(){
    const { name: name1, hp: hp1, } = player1;
    const { name: name2, hp: hp2, } = player2;

    if (hp1 === 0 || hp2 === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if (hp1 === 0 && hp1 < hp2) {
        writeWinTitle(name2);
        generateLogs('end', player2, player1);
    } else if (hp2 === 0 && hp2 < hp1) {
        writeWinTitle(name1);
        generateLogs('end', player1, player2);
    } else if (hp1 === 0 && hp2 === 0) {
        writeWinTitle();
        generateLogs('draw');
    }
}