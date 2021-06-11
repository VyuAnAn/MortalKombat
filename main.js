
const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

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
    attack,
//    attack: function() {
//        console.log(player1.name + ' Fight...');
//    }
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
    attack,
};


function createElement(tag, className){
    // создать элемент, добавить класс при необходимости
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className)
    }

    return $tag;
}


function createPlayer(playerObject) {
    // создание игрока

    const $div = createElement('div', 'player'+  playerObject.player);
    const $divProgressbar = createElement('div', 'progressbar');
    const $divCharacter = createElement('div', 'character');
    const $divLife = createElement('div', 'life');
    const $divName = createElement('div', 'name');
    const $img = createElement('img');

    $divLife.style.width = playerObject.hp + '%';
    $divName.innerText = playerObject.name;
    $img.src =  playerObject.img;

    $divProgressbar.appendChild($divLife);
    $divProgressbar.appendChild($divName);

    $divCharacter.appendChild($img);

    $div.appendChild($divProgressbar);
    $div.appendChild($divCharacter);

    return $div;
}


function getRandom(number){
    return Math.ceil(Math.random() * number);
}


// old changeHP
//function changeHP(player) {
//    // изменить HP
//    const $playerLife = document.querySelector('.player' + player.player + ' .life');
//    player.hp -= getRandom(20);
//
//    if (player.hp <= 0) {
//        player.hp = 0;
//    }
//    $playerLife.style.width = player.hp + '%';
//}


// 1. Функция changeHP должна в аргументах принимать, на какое кол-во надо изменять HP.
// И решать, нужно ли отнимать или ставить 0. Больше ничего эта функция не должна делать.
function changeHP(hp) {
    if (this.hp <= hp) {
        this.hp = 0;
    } else {
        this.hp -= hp;
    }
}


//2. Вторая функци elHP (это именно функция) должна возвращать document.querySelector,
//который должен ссылаться на внутреннее поле player, которое выводит 1 или 2.
function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

//3. Третья функци renderHP должна только рендерить hp, т.е. рисовать hp при помощи style.width.
function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function attack(attack, enemy){
    if (attack.defence != enemy.hit) {
        this.changeHP(enemy.value);
        this.renderHP();
    }
}

//function createTitle(playerName, className, title){
//    const $title = createElement('div', className);
//
//    $title.innerText = playerName + ' ' + title;
//    $arenas.appendChild($title);
//
//    return $title;
//}


//function playerLose(name){
//    // проигравший
//    const $loseTitle = createElement('div', 'loseTitle');
//    $loseTitle.innerText = name + ' lose';
//
//    return $loseTitle;
//}


function playerWin(name){
    // победитель
    const $winTitle = createElement('div', 'winTitle');
    if (name) {
        $winTitle.innerText = name + ' wins';
    } else {
        $winTitle.innerText = 'draw';
    }
    return $winTitle;
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


//$randomButton.addEventListener('click', function() {
////    console.log('Click button');
////    changeHP(player2);
////    changeHP(player1);
//
//    player2.changeHP(getRandom(20));
//    player1.changeHP(getRandom(20));
//
//    player2.renderHP();
//    player1.renderHP();
//
//    if (player1.hp === 0 || player2.hp === 0) {
//        $randomButton.disabled = true;
//        createReloadButton();
//    }
//
//    if (player1.hp === 0 && player1.hp < player2.hp) {
//        $arenas.appendChild(playerWin(player2.name));
//    } else if (player2.hp === 0 && player2.hp < player1.hp) {
//        $arenas.appendChild(playerWin(player1.name));
//    } else if (player1.hp === 0 && player2.hp === 0) {
//        $arenas.appendChild(playerWin());
//    }
//});


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));


function enemyAttack(){
    // удар противника
    const hit = ATTACK[getRandom(3)-1];  // куда бить
    const defence = ATTACK[getRandom(3)-1]; // что защищать

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}


function writeWinTitle(name){
    $arenas.appendChild(playerWin(name))
}


$formFight.addEventListener('submit', function(event){
    event.preventDefault();

    const enemy = enemyAttack();
    const attack = {};

    for (let item of $formFight){
        if (item.checked && item.name === 'hit'){
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence'){
            attack.defence = item.value;
        }

        item.checked = false;
    }

    player1.attack(attack, enemy);
    player2.attack(enemy, attack);

//    console.log('attack: ', attack);
//    console.log('enemy: ', enemy);
//
//    console.log('player1', player1.hp);
//    console.log('player2', player2.hp);

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        writeWinTitle(player2.name);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        writeWinTitle(player1.name);
    } else if (player1.hp === 0 && player2.hp === 0) {
        writeWinTitle();
    }
})


//- http://reactmarathon-api.herokuapp.com/assets/scorpion.gif
//- http://reactmarathon-api.herokuapp.com/assets/kitana.gif
//- http://reactmarathon-api.herokuapp.com/assets/liukang.gif
//- http://reactmarathon-api.herokuapp.com/assets/sonya.gif
//- http://reactmarathon-api.herokuapp.com/assets/subzero.gif