export type PossibleCategory = {
  id: string;
  displayName: string;
}

type Locality = {
  name: string;
}

export type Question = {
  locality: Locality;
  options: PossibleCategory[];
  selected?: PossibleCategory;
  correct: PossibleCategory;
};

export type Game = {
  questions: Question[];
  questionIndex: number;
  correctlyAnswered: number;
}
