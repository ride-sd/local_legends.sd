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
  currentQuestion: Question;
  remainingQuestions: Question[];
  questionIndex: number;
  totalQuestions: number;
  correctlyAnswered: number;
}
