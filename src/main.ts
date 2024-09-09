import './style.css'
import { displayStartScreen } from './game.ts'
import { loadQuiz, generateQuestions, initializeQuizState } from './state.ts'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="start-screen">
    <button id="start-button">Start</button>
  </div>
  <div id="display-container">
    <div class="header">
      <div class="number-of-count">
        <span class="number-of-question">1 of 3 questions</span>
      </div>
      <div class="timer-div">
        <img src="https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/stopwatch-icon.png" width="20px" />
        <span class="time-left">10s</span>
      </div>
    </div>
    <div id="container">
      <!-- questions and options will be displayed here -->
    </div>
    <button id="next-button">Next</button>
  </div>
  <div class="score-container hide">
    <div id="user-score">Demo Score</div>
    <button id="restart">Restart</button>
  </div>
`

let startScreen = document.querySelector<HTMLDivElement>(".start-screen")!;
let displayContainer = document.getElementById("display-container")!;

const gameData = await loadQuiz("san_diego");
const questions = generateQuestions(gameData, 10);
const gameState = initializeQuizState(questions);

displayStartScreen(startScreen, displayContainer);



let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startButton = document.getElementById("start-button");
