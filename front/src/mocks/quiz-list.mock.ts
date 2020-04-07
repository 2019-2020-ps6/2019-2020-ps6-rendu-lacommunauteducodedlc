import {Quiz, QuizTheme} from '../models/quiz.model';
import {Question} from '../models/question.model';

export const QUESTION_ACTOR: Question = {
  label: 'Jean Gabin a joué dans...',
  answers: [
    {
      value: 'Les tuches II',
      isCorrect: false,
      id: 0
    },
    {
      value: 'La grande illusion',
      isCorrect: true,
      id: 1
    }
  ],
  id: 4
};

export const QUESTION_SPORT: Question = {
  label: 'Le foot c\'est...',
  answers: [
    {
      value: 'Nul',
      isCorrect: false,
      id: 0
    },
    {
      value: 'TRES nul',
      isCorrect: true,
      id: 1
    }
  ],
  id: 14
};

export const QUIZ_LIST: Quiz[] = [];
