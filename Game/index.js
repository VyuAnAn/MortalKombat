// У этого класса обязательно должен быть метод `start()`, который как раз и запустит игру.
// Весь функционал, который до этого мы писали в одном файле, а потом разбивали на разные,
// используй внутри класса.

import { createRandomNumber, createElement, getTime } from '../utils';
import { HIT, ATTACK, LOGS } from '../constants';
import Player from '../Player';

const $chat = document.querySelector('.chat');
const $arenas = document.querySelector('.arenas');


class Game{
    constructor(props) {
        this.player1 = {};
        this.player2 = {};
    }

    choosePlayer = async () => {
        const player = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
            .then(res => res.json());
        return player;
    }

    fightPlayers = async (hit, defence) => {
       const fight = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        }).then(res => res.json());
        return fight;
    }

    start = async () => {
        const p2 = await this.choosePlayer();
        const p1 = JSON.parse(localStorage.getItem('player1'));

        this.player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas',
        });

        this.player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas',
        });

        this.player1.createPlayer();
        this.player2.createPlayer();

        this.generateLogs('start', this.player1, this.player2);
    }

    fight = async ($formFight) => {
        const { hit, defence } = this.playerAttack($formFight);
        const resultFight = await this.fightPlayers(hit, defence);

        const { hit: hitPlayer, value: valuePlayer, defence: defencePlayer } = resultFight.player1;
        const { hit: hitEnemy, value: valueEnemy, defence: defenceEnemy } = resultFight.player2;


        if (defencePlayer !== hitEnemy){
            this.player1.changeHP(valueEnemy);
            this.player1.renderHP();
            this.generateLogs('hit', this.player2, this.player1, valueEnemy);

        } else if (defencePlayer === hitEnemy){
            this.generateLogs('defence', this.player1, this.player2);
        }

        if (defenceEnemy !== hitPlayer){
            this.player2.changeHP(valuePlayer);
            this.player2.renderHP();
            this.generateLogs('hit', this.player1, this.player2, valuePlayer);

        } else if (defenceEnemy === hitPlayer){
            this.generateLogs('defence', this.player2, this.player1);
        }

        this.showResult(this.player1, this.player2);
    }

//    enemyAttack = () => {
//        // удар противника
//        const hit = ATTACK[createRandomNumber(0, ATTACK.length)];  // куда бить
//        const defence = ATTACK[createRandomNumber(0, ATTACK.length)]; // что защищать
//
//        return {
//            value: createRandomNumber(1, HIT[hit] + 1),
//            hit,
//            defence
//        }
//    }

    playerAttack = ($formFight) => {
        const attack = {};

        for (let item of $formFight){
            if (item.checked && item.name === 'hit'){
//                attack.value = createRandomNumber(1, HIT[item.value] + 1);
                attack.hit = item.value;
            }

            if (item.checked && item.name === 'defence'){
                attack.defence = item.value;
            }

            item.checked = false;
        }

        return attack;
    }

    writeWinTitle = (name) => {
        $arenas.appendChild(this.playerWin(name));
    }

    playerWin = (name) => {
        // победитель
        const $winTitle = createElement('div', 'winTitle');
        if (name) {
            $winTitle.innerText = `${name} wins`;
        } else {
            $winTitle.innerText = 'draw';
        }
        return $winTitle;
    }

    createReloadButton = () => {
        const $divReloadWrap = createElement('div', 'reloadWrap');
        const $button = createElement('button', 'button');
        $button.innerText = 'Restart';

        $divReloadWrap.appendChild($button);
        $arenas.appendChild($divReloadWrap);

        $button.addEventListener('click', function() {
            window.location.pathname = 'MortalKombat/index.html';
        });
    }

    generateLogs = (type, { name }, { name: playerName2, hp }, valueAttack) => {
        let text = '';
        let time = getTime();

        const logLength = LOGS[type].length;

        switch (type) {
            case 'start':
                text = LOGS[type]
                           .replace('[player1]', name)
                           .replace('[player2]', playerName2)
                           .replace('[time]', time);
                break;
            case 'end':
                text = `${time} - ${LOGS[type][createRandomNumber(0, logLength)]
                           .replace('[playerWins]', name)
                           .replace('[playerLose]', playerName2)}`;
                break;
            case 'hit':
                text = `${time} - ${LOGS[type][createRandomNumber(0, logLength)]
                            .replace('[playerDefence]', playerName2)
                            .replace('[playerKick]', name)}
                            [-${valueAttack}][${hp}/100]`;
                break;
            case 'defence':
                text =  `${time} - ${LOGS[type][createRandomNumber(0, logLength)]
                            .replace('[playerKick]', playerName2)
                            .replace('[playerDefence]', name)}`;
                break;
            case 'draw':
                text =  `${time} - ${LOGS[type]}`;
                break;
            default:
                text =  `${time} - Что-то пошло не по плану!`;
                break;
        }

        const el = `<p>${text}</p>`;
        $chat.insertAdjacentHTML('afterbegin', el);
    }

    showResult = (player1, player2) => {
        if (player1.hp === 0 || player2.hp === 0) {
            document.querySelector('.button').disabled = true;
            this.createReloadButton();
        }

        if (player1.hp === 0 && player1.hp < player2.hp) {
            this.writeWinTitle(player2.name);
            this.generateLogs('end', player2, player1);

        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            this.writeWinTitle(player1.name);
            this.generateLogs('end', player1, player2);

        } else if (player1.hp === 0 && player2.hp === 0) {
            this.writeWinTitle();
            this.generateLogs('draw');
        }
    }
}

export default Game;

