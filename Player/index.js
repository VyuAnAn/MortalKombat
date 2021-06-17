import { createElement } from '../utils';
import Game from '../Game';

class Player{
    constructor(props) {
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.player = props.player;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }

    // используй внутри классов стрелочную функцию, чтобы не потерять контекст,
    // т.к. стрелочная функция внутри класса указывает на this именно этого класса

    changeHP = (hp) => {
        if (this.hp <= hp) {
            this.hp = 0;
        } else {
            this.hp -= hp;
        }
    }

    elHP = () => {
        return document.querySelector(`.${this.selector} .life`);
    }

    renderHP = () => {
        this.elHP().style.width = `${this.hp}%`;
    }

    createPlayer = () => {
        // создание игрока
        const $player = createElement('div', this.selector);
        const $divProgressbar = createElement('div', 'progressbar');
        const $divCharacter = createElement('div', 'character');
        const $divLife = createElement('div', 'life');
        const $divName = createElement('div', 'name');
        const $img = createElement('img');

        $divLife.style.width = this.hp + '%';
        $divName.innerText = this.name;
        $img.src =  this.img;

        $divProgressbar.appendChild($divLife);
        $divProgressbar.appendChild($divName);

        $divCharacter.appendChild($img);

        $player.appendChild($divProgressbar);
        $player.appendChild($divCharacter);

        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);

        return $player;
    }
}

export default Player;








