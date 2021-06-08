
const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Kunai', 'Axe', 'Ninja Sword'],
    attack: function() {
        console.log(player1.name + ' Fight...');
    }
};

const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Kori Blade', 'Hummer'],
    attack: function() {
        console.log(player2.name + ' Fight...');
    }
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

function changeHP(player) {
    // изменить HP
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= Math.ceil(Math.random() * 20);

    if (player.hp <= 0) {
        player.hp = 0;
        $randomButton.disabled = true;
    }
    $playerLife.style.width = player.hp + '%';
}


function createTitle(playerName, className, title){
    const $title = createElement('div', className);

    $title.innerText = playerName + ' ' + title;
    $arenas.appendChild($title);

    return $title;
}


//function playerLose(name){
//    // проигравший
//    const $loseTitle = createElement('div', 'loseTitle');
//    $loseTitle.innerText = name + ' lose';
//
//    return $loseTitle;
//}


//function playerWin(name){
//    // победитель
//    const $winTitle = createElement('div', 'winTitle');
//    $winTitle.innerText = name + ' wins';
//
//    return $winTitle;
//}


$randomButton.addEventListener('click', function() {
    console.log('Click button');
    changeHP(player2);
    changeHP(player1);

    if (player1.hp == 0) {
        createTitle(player2.name, 'winTitle', 'wins');
    } else if (player2.hp == 0) {
        createTitle(player1.name, 'winTitle', 'wins');
    }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

//- http://reactmarathon-api.herokuapp.com/assets/scorpion.gif
//- http://reactmarathon-api.herokuapp.com/assets/kitana.gif
//- http://reactmarathon-api.herokuapp.com/assets/liukang.gif
//- http://reactmarathon-api.herokuapp.com/assets/sonya.gif
//- http://reactmarathon-api.herokuapp.com/assets/subzero.gif