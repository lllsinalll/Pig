'use strict';

// Selecting elements
const diceImg = document.querySelector('.dice');
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const current1 = document.querySelector('#current--0');
const current2 = document.querySelector('#current--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const name0 = document.querySelector('#name--0');
const name1 = document.querySelector('#name--1');

// Game initialization
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset scores and names
  score1.textContent = '0';
  score2.textContent = '0';
  current1.textContent = '0';
  current2.textContent = '0';
  name0.textContent = 'Player 1';
  name1.textContent = 'Player 2';

  // Reset styles
  diceImg.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  roll.classList.remove('game-over');
  hold.classList.remove('game-over');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

// Rolling dice functionality
roll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold functionality
hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      // Update winner/loser names
      document.getElementById(`name--${activePlayer}`).textContent =
        'Winner! 🏆';
      document.getElementById(
        `name--${activePlayer === 0 ? 1 : 0}`
      ).textContent = 'Loser! 😞';

      // Change button colors
      roll.classList.add('game-over');
      hold.classList.add('game-over');

      // Update player styles
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceImg.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// New game button
newGame.addEventListener('click', init);
