import './style.css'
import { displayStartScreen, renderGame, displayCurrentQuestion } from './game.ts'
import { loadQuiz, generateQuestions, initializeQuizState, } from './state.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="start-screen">
    <div class="info">
        <h1>Local Legends San Diego Edition</h1>
        <p>Can you categorize these localities?</p>
    </div>
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

const numOfQuestions = 10;

const startScreen = document.querySelector<HTMLDivElement>(".start-screen")!
const displayContainer = document.getElementById("display-container")!

const scoreContainer = document.querySelector(".score-container")
const restart = document.getElementById("restart")!
const startButton = document.getElementById("start-button")!

const gameData = loadQuiz();

let gameState = initializeQuizState(generateQuestions(gameData, numOfQuestions))

displayStartScreen(startScreen, displayContainer)
renderGame(displayContainer, gameState)

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide")

  displayContainer.classList.remove("hide")
  displayCurrentQuestion(gameState)
})

restart.addEventListener("click", () => {
  scoreContainer?.classList.add("hide")
  gameState = initializeQuizState(generateQuestions(gameData, 10))

  renderGame(displayContainer, gameState)

  displayContainer.classList.remove("hide")
  displayCurrentQuestion(gameState)
})
