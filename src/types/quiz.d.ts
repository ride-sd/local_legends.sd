export interface Quiz {
  title: string

  categories: Array<Category>
}

export interface Category {
  slug: string

  name: string

  displayName: string

  options: Array<Option>
}

export interface Option {
  name: string

  difficulty: number
}
