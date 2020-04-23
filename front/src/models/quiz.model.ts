import { Question } from './question.model';

export interface Quiz {
    name: string;
    theme: QuizTheme;
    questions: Question[];
    iconClass?: string;
    date?: Date;
    id: number;
    difficulty: number;
}

export enum QuizTheme {
  Sport,
  Acteurs,
  Films,
  Art,
  Littérature,
  Musique
}
