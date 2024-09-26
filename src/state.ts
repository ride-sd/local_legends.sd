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

export function buildDistribution(length : number, divideBy : number) : number[] {
  const minAmount : number = Math.floor(length / divideBy)

  const distribution : number[] = Array.from({length: divideBy}, () => minAmount)

  const remaining = (length % divideBy)

  for(let i = 0; i < remaining; i++) {
    distribution[i] += 1
  }

  return distribution
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

  const distribution : number[] = shuffleArray(buildDistribution(length, possibleCategories.length))

  const questions : Question[] = distribution.map((amount : number, index : number) => {
    const category = quizData.categories[index]

    return shuffleArray(category.options).slice(0, amount).map((option) => (
      {
        locality: {
          name: option.name,
        },
        options: possibleCategories,
        correct: {
          id: category.slug,
          displayName: category.displayName
        },
        difficulty: option.difficulty
      }
    ))
  }).flat()

  return shuffleArray(questions)
}

export function initializeQuizState(questions: Question[]) : Game {
  return {
    questions: questions,
    questionIndex: 0,
    correctlyAnswered: 0,
  }
}
