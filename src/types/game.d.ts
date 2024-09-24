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
  difficulty: number;
};

export type Game = {
  questions: Question[];
  questionIndex: number;
  correctlyAnswered: number;
}
