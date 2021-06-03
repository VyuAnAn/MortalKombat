console.log('Fight...');

const player1 = {
    name: 'SCORPION',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Kunai', 'Axe', 'Ninja Sword'],
    attack: function() {
        console.log(player1.name + ' Fight...');
    }
};

const player2 = {
    name: 'SUB-ZERO',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Kori Blade', 'Hummer'],
    attack: function() {
        console.log(player2.name + ' Fight...');
    }
};

player1.attack();
player2.attack();

function createPlayer(player, playerObject) {
    // создание игрока
    const $div = document.createElement('div');
    $div.classList.add(player);

    const $divProgressbar = document.createElement('div');
    $divProgressbar.classList.add('progressbar');
    $div.appendChild($divProgressbar);

    const $divCharacter = document.createElement('div');
    $divCharacter.classList.add('character');
    $div.appendChild($divCharacter);

    const $divLife = document.createElement('div');
    $divLife.classList.add('life');
    $divLife.style.width = playerObject.hp + 'px';
    $divProgressbar.appendChild($divLife);

    const $divName = document.createElement('div');
    $divName.classList.add('name');
    $divName.innerText = playerObject.name;
    $divProgressbar.appendChild($divName);

    const $img = document.createElement('img');
    $img.src =  playerObject.img;
    $divCharacter.appendChild($img);

    const arenas = document.querySelector('.arenas');
    arenas.appendChild($div);
}

createPlayer('player1', player1);
createPlayer('player2', player2);

//- http://reactmarathon-api.herokuapp.com/assets/scorpion.gif
//- http://reactmarathon-api.herokuapp.com/assets/kitana.gif
//- http://reactmarathon-api.herokuapp.com/assets/liukang.gif
//- http://reactmarathon-api.herokuapp.com/assets/sonya.gif
//- http://reactmarathon-api.herokuapp.com/assets/subzero.gif