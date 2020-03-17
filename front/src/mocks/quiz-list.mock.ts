import {Quiz, QuizTheme} from '../models/quiz.model';
import {Question} from '../models/question.model';

export const QUESTION_ACTOR: Question = {
  label: 'Jean Gabin a joué dans...',
  answers: [
    {
      value: 'Les tuches II',
      isCorrect: false,
    },
    {
      value: 'La grande illusion',
      isCorrect: true,
    }
  ]
};

export const QUESTION_SPORT: Question = {
  label: 'Le foot c\'est...',
  answers: [
    {
      value: 'Nul',
      isCorrect: false,
    },
    {
      value: 'TRES nul',
      isCorrect: true,
    }
  ]
};

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'Les Acteurs', // What's happening if I change this value..?
        theme: QuizTheme.Actor,
        questions: [QUESTION_ACTOR],
      id: 1,
    },
    {
        name: 'Les Sports',
        theme: QuizTheme.Sport,
        questions: [QUESTION_SPORT],
        iconClass: 'fas fa-basketball-ball',
        id: 2,
    }
];
