
const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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
    return document.querySelector(`.player${this.player} .life`);
}

//3. Третья функци renderHP должна только рендерить hp, т.е. рисовать hp при помощи style.width.
function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}

//function attack(attack, enemy){
//    if (attack.defence != enemy.hit) {
//        this.changeHP(enemy.value);
//        this.renderHP();
//    }
//}

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
        $winTitle.innerText = `${name} wins`;
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


function playerAttack(){
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

    return attack;
}


function writeWinTitle(name){
    $arenas.appendChild(playerWin(name))
}


function showResult(){
    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        writeWinTitle(player2.name);
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        writeWinTitle(player1.name);
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        writeWinTitle();
        generateLogs('draw');
    }
}

function getCorrectTime(time){
    if (time < 10) {
        return `0${time}`;
    } else {
        return time;
    }
}


function generateLogs(type, player1, player2, hp){
    let text = '';
    let time = new Date();
    time = `${getCorrectTime(time.getHours())}:${getCorrectTime(time.getMinutes())}`;

    switch (type) {
        case 'start':
            text = logs[type].replace('[player1]', player1.name)
                        .replace('[player2]', player2.name)
                        .replace('[time]', time);
            break;
        case 'end':
            text = `${time} - ${logs[type][getRandom(3)-1]
                        .replace('[playerWins]', player1.name)
                       .replace('[playerLose]', player2.name)}`;
            break;
        case 'hit':
            text = `${time} - ${logs[type][getRandom(18)-1]
                        .replace('[playerDefence]', player2.name)
                        .replace('[playerKick]', player1.name)}
                        [-${hp}][${player2.hp}/100]`;
            break;
        case 'defence':
            text =  `${time} - ${logs[type][getRandom(8)-1]
                        .replace('[playerKick]', player2.name)
                        .replace('[playerDefence]', player1.name)}`;
            break;
        case 'draw':
            text =  `${time} - ${logs[type]}`;
            break;
        default:
            text =  `${time} - Что-то пошло не по плану!`;
            break;

    }
    console.log(text);
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}


generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function(event){
    event.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit){
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    } else if (player.defence === enemy.hit){
        generateLogs('defence', player1, player2);
    }

    if (enemy.defence !== player.hit){
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);
    } else if (enemy.defence === player.hit){
        generateLogs('defence', player2, player1);
    }

    showResult();
//    player1.attack(attack, enemy);
//    player2.attack(enemy, attack);
})


//- http://reactmarathon-api.herokuapp.com/assets/scorpion.gif
//- http://reactmarathon-api.herokuapp.com/assets/kitana.gif
//- http://reactmarathon-api.herokuapp.com/assets/liukang.gif
//- http://reactmarathon-api.herokuapp.com/assets/sonya.gif
//- http://reactmarathon-api.herokuapp.com/assets/subzero.gif