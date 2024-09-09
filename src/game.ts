import { Game  } from "./types/game";

export function displayStartScreen(startScreen: HTMLDivElement, displayContainer: HTMLElement) {
  window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
  };
}

export function setupQuiz(game : Game) {

}
