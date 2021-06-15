import { $arenas, $formFight, createElement, createRandomNumber } from './utils.js';
import { generateLogs } from './logs.js';
import { player1, player2, createPlayer, enemyAttack, playerAttack, showResult } from './player.js';

//3. Также мы познакомились со стрелочной функцией. Используй ее максимально.
//Но помни главное правило: у стрелочной функции нет контекста, а значит она легко может потерять this,
//просто возьми это на заметку.

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

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
})