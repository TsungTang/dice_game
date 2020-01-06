/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, gamePlaying , finalScore;
finalScore = 100


var finalScoreDom = document.querySelector('.final-score')
// 初始化
initGame();

// 設定winning score
document.querySelector('.final-score').addEventListener('input' , function () {
  if(finalScoreDom.value) {
    finalScore = finalScoreDom.value
    initGame()
  
  }
})




var lastdice =[0,0]

// event roll dice
document.querySelector('.btn-roll').addEventListener('click', function () {
  // 判斷遊戲進行中
  if (!gamePlaying) {
    return;
  }
  var dice = [0,0]
  for (i = 0; i <= 1; i++) {
    // 1. Random number
    dice[i] = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.getElementById('dice-'+(i+1));
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice_' + dice[i] + '.png';

    // 3. Update the round score (前提是不要骰到1)
    if (dice[i] !== 1) {
      // add score
      roundScore += dice[i];
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
      break
    }

  }

    // 設定特殊條件，dice 連續出現6 全部分數歸0 (兩個dice獨立計算)
  if((dice[0] === 6 && lastdice[0]===6) || (dice[1] === 6 && lastdice[1]===6)  ){
    scores[activePlayer] = 0
    document.getElementById('score-' + activePlayer).textContent = '0';
    document.getElementById('current-' + activePlayer).textContent = '0';
    nextPlayer();
  }

  lastdice[0], lastdice[1] = dice[0],dice[1]



})


// Hold button
document.querySelector('.btn-hold').addEventListener('click', function () {

  // 判斷遊戲進行中
  if (!gamePlaying) {
    return;
  }

  // 1. Add current score to Global score
  scores[activePlayer] += roundScore;

  // 2. Update the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

  // 3. Check if player won the game
  if (scores[activePlayer] >= finalScore) {

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    document.getElementById('name-' + activePlayer).textContent = 'Winner!!'
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('Winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('Winner');

    gamePlaying = false;
  } else {
    nextPlayer();
  }


})

document.querySelector('.btn-new').addEventListener('click', initGame);

// Switch Player
function nextPlayer() {
  // 歸0
  document.getElementById('current-' + activePlayer).textContent = '0';
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  //active background
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';

}


// New Game 重製遊戲/初始化
function initGame() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // change css
  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';


  // quertbyID
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('Winner');
  document.querySelector('.player-1-panel').classList.remove('Winner');

  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
}
