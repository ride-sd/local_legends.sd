export type PossibleAnswer = {
  id: string;
  displayName: string;
}

type Locality = {
  name: string;
}

export type Question = {
  locality: Locality;
  options: PossibleAnswer[];
  selected?: PossibleAnswer;
  correct: PossibleAnswer;
};

export type Game = {
  questions: Question[];
  questionIndex: number;
  correctlyAnswered: number;
}
