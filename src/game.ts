import { Question, Game  } from "./types/game";

declare const fathom: any;

export function displayStartScreen(startScreen: HTMLDivElement, displayContainer: HTMLElement) {
  window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
  };
}

function verifyAnswer(clickedOption : HTMLButtonElement, allOptions : HTMLButtonElement[], currentQuestion: Question, game: Game) {
  if(clickedOption.dataset.id === currentQuestion.correct.id) {
    game.correctlyAnswered += 1
    trackAnswer(fathom, currentQuestion, clickedOption, "correct")
  } else {
    clickedOption.classList.add("incorrect")
    trackAnswer(fathom, currentQuestion, clickedOption, "incorrect")
  }

  allOptions.forEach((element) => {
    if(element.dataset.id === currentQuestion.correct.id) {
      element.classList.add("correct")
    }

    element.disabled = true;
  })
}

export function renderGame(container: HTMLElement, game: Game) {
  container.innerHTML = "";

  game.questions.forEach((questionData) => {
    const questionContainer = document.createElement("div")
    questionContainer.classList.add("container-mid", "hide")

    const question = document.createElement("p")
    question.classList.add("question")
    question.innerHTML = questionData.locality.name

    questionContainer.appendChild(question)

    const answers = questionData.options.map((option) => {
      const optionButton : HTMLButtonElement = document.createElement("button")

      optionButton.classList.add("option-div")
      optionButton.dataset.id = option.id
      optionButton.innerHTML = option.displayName

      return optionButton
    })

    answers.forEach((answer) => {
      answer.onclick = () => {
        verifyAnswer(answer, answers, questionData, game)
      }

      questionContainer.appendChild(answer)
    })

    container.appendChild(questionContainer)
  })

  const nextButton : HTMLButtonElement = document.createElement("button")
  nextButton.id = "next-button"
  nextButton.innerHTML = "Next"

  nextButton.onclick = () => {
    if(game.questionIndex === game.questions.length - 1) {
      hideCurrentQuestion(game)
      document.getElementById("display-container")!.classList.add("hide")

      showScore(game)

      const scoreContainer = document.querySelector(".score-container")!
      const userScore = document.querySelector("#user-score")!

      userScore.innerHTML = `You scored ${game.correctlyAnswered} out of ${game.questions.length}`
      scoreContainer.classList.remove("hide")
    } else {
      game.questionIndex += 1
      displayCurrentQuestion(game)
    }
  }

  container.appendChild(nextButton)
}

function trackAnswer(fathom : any, question : Question, selectedOption : HTMLButtonElement, result : "correct" | "incorrect") {
  if (typeof fathom !== "undefined") {
    fathom.trackEvent(JSON.stringify({locality: question.locality.name, selection: selectedOption.dataset.id, result: result, difficulty: question.difficulty}))
  }
}

function showScore(game : Game) {
  const scoreContainer = document.querySelector(".score-container")!
  const userScore = document.getElementById("user-score")!

  userScore.innerHTML = `You scored ${game.correctlyAnswered} out of ${game.questions.length}`

  scoreContainer.classList.remove("hide")
}

function hideCurrentQuestion(game : Game) {
  const questionContainer = document.querySelectorAll(".container-mid")

  questionContainer[game.questionIndex].classList.add("hide")
}

export function displayCurrentQuestion(game: Game) {
  const questionContainer = document.querySelectorAll(".container-mid")

  questionContainer.forEach((container) => {
    container.classList.add("hide")
  })

  questionContainer[game.questionIndex].classList.remove("hide")
}
