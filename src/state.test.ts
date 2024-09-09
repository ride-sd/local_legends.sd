
import { Quiz } from './types/generated/quiz.pkl'
import { describe, expect, test } from 'vitest'
import { generateQuestions } from './state'

describe('generateQuestions', () => {
  const exampleQuiz : Quiz = {
    title:  "Local Legends San Diego Edition",
    categories: [
      {
        slug: 'city',
        name: 'City in San Diego County',
        displayName: 'City',
        options: [
          {
            name: 'San Diego',
            difficulty: 1
          },
          {
            name: 'Encinitas',
            difficulty: 1
          }
        ]
      },
      {
        slug: 'unincorporated-community',
        name: 'Unincorporated Community in San Diego County',
        displayName: 'Unincorporated Community',
        options: [
          {
            name: 'Spring Valley',
            difficulty: 1
          },
        ]
      },
      {
        slug: 'made-up',
        name: 'Made Up Place',
        displayName: 'You Made This Up',
        options: [
          {
            name: 'Willow Creek Hollow',
            difficulty: 1
          },
          {
            name: 'Cedarwood City',
            difficulty: 1
          }
        ]
      },
      {
        slug: 'neighborhood',
        name: 'Neighborhood of the city of San Diego',
        displayName: 'Neighborhood',
        options: [
          {
            name: 'North Park',
            difficulty: 1
          },
          {
            name: 'City Heights',
            difficulty: 1
          },
          {
            name: 'Golden Hill',
            difficulty: 1
          }
        ]
      }
    ]
  }

  test('generates a list of questions', () => {
    expect(generateQuestions(exampleQuiz, 2).length).toBe(2)
  })
})
