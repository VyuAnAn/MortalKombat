import Game from './Game';


const $formFight = document.querySelector('.control');

const game = new Game();
game.start();

$formFight.addEventListener('submit', function (event){
    event.preventDefault();
    game.fight($formFight);
});