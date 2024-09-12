import { Game, Question, PossibleAnswer } from './types/game';
import { Quiz, Category } from './types/quiz'
import quizData from './data/san_diego.json'

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function loadQuiz() : Quiz {
  return quizData as Quiz
}

export function generateQuestions(quizData : Quiz, length: number) : Question[] {
  const possibleCategories : PossibleAnswer[] = quizData.categories.flatMap((category: Category) => {
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
  return {
    questions: questions,
    questionIndex: 0,
    correctlyAnswered: 0,
  }
}
