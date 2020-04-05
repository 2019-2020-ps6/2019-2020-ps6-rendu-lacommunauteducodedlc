import { Question } from './question.model';

export interface Quiz {
    name: string;
    theme: string;
    questions: Question[];
    iconClass?: string;
    date?: Date;
    id: number;
    difficulty: number;
}

export enum QuizTheme {
  Sport,
  Actor,
  Movie,
  Art,
  Literature,
  Music
}
