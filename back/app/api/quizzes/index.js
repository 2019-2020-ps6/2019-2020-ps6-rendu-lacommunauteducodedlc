const { Router } = require('express');

const { Quiz, Question, Answer } = require('../../models');
const QuestionRouter = require('./questions');

const router = new Router();

router.get('/', (req, res) => {
  try {
    const quizzes = Quiz.get();
    quizzes.forEach((quiz) => {
      let questions = Question.get();
      questions = questions.filter((i) => i.quizId === quiz.id);
      questions.forEach((question) => {
        let answers = Answer.get();
        answers = answers.filter(answer => answer.questionId==(question.id));
        // eslint-disable-next-line no-param-reassign
        question.answers = answers
      });
      // eslint-disable-next-line no-param-reassign
      quiz.questions = questions
      Question.load()
      Quiz.load()
    });
    res.status(200).json(quizzes)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:quizId', (req, res) => {
  try {
    const quiz = Quiz.getById(req.params.quizId);

    let questions = Question.get();
    questions = questions.filter((i) => i.quizId === quiz.id);
    questions.forEach((question) => {
      const answers = Answer.get();
      question.answers = answers.filter((answer) => answer.questionId === question.id);
    });
    // eslint-disable-next-line no-param-reassign
    quiz.questions = questions;

    res.status(200).json(quiz);
    Question.load()
    Quiz.load()
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  console.log({ ...req.body });
  try {
    const quiz = Quiz.create({ ...req.body });

    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
});

router.delete('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.delete(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, { ...req.body }))
  } catch (err) {
    res.status(500).json(err)
  }
});

router.use('/:quizId/questions', QuestionRouter);

module.exports = router;
