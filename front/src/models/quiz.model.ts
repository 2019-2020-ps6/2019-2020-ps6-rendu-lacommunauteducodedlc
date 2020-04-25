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
  'Acteurs',
  'Animaux',
  'Art',
  'Culture générale',
  'Films',
  'Histoire',
  'Littérature',
  'Musique',
  'Nourriture',
  'Sciences',
  'Séries',
  'Société',
  'Sport',
  'Technologie',
  'Télévision',
}
