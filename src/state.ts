import { Game, Question, PossibleCategory } from './types/game';
import { Quiz, Category, loadFromPath } from './types/generated/quiz.pkl'

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function loadQuiz(name : string) : Promise<Quiz> {
  return loadFromPath(`./data/${name}.pkl`)
}

export function generateQuestions(quizData : Quiz, length: number) : Question[] {
  const possibleCategories : PossibleCategory[] = quizData.categories.flatMap((category: Category) => {
    return {
      id: category.slug,
      displayName: category.displayName
    }
  })

  const allQuestions : Question[] = quizData.categories.map((category: Category) => (
    category.options.map((option) => (
      {
        locality: {
          name: option.name,
        },
        options: possibleCategories,
        correct: {
          id: category.slug,
          displayName: category.displayName
        }
      }
    ))
  )).flat()

  return shuffleArray(allQuestions).slice(0, length)
}

export function initializeQuizState(questions: Question[]) : Game {
  const [currentQuestion, ...remainingQuestions] = questions;

  return {
    currentQuestion: currentQuestion,
    remainingQuestions: remainingQuestions,
    questionIndex: 0,
    totalQuestions: questions.length,
    correctlyAnswered: 0,
  }
}
