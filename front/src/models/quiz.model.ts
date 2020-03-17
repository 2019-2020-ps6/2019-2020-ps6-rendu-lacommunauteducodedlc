import { Question } from './question.model';

export interface Quiz {
    name: string;
    theme: QuizTheme;
    questions: Question[];
    iconClass?: string;
    date?: Date;
    id: number;
}

export enum QuizTheme {
  Sport,
  Actor,
  Movie,
  Art,
  Literature,
  Music
}
