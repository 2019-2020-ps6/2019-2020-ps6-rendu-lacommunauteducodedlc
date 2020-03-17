const { Router } = require('express')

const { Question, Answer } = require('../../../models')
const AnswerRouter = require('./answers')

const router = new Router({ mergeParams: true })

function getAnswerArray(question) {
  let answerTab = Answer.get()
  answerTab = answerTab.filter(answer => answer.questionId === question.id)
  return answerTab
}

router.get('/', (req, res) => {
  try {
    let questions = Question.get()
    if (!req.params.quizId === undefined) {
      questions = questions.filter((i) => i.quizId === parseInt(req.params.quizId, 10))
    }
    questions.forEach((question) => question.answers = getAnswerArray(question))
    res.status(200).json(questions)
    Question.load()
  } catch (err) {
    res.status(500).json(err)
    Question.load()
  }
})

router.get('/:questionId', (req, res) => {
  try {
    const question = Question.getById(req.params.questionId)
    question.answers = getAnswerArray(question)
    res.status(200).json(question)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    req.body.quizId = parseInt(req.params.quizId, 10)
    const question = Question.create({ ...req.body })
    res.status(201).json(question)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/', (req, res) => {
  try {
    let questions = Question.get()
    if (!req.params.quizId === undefined) {
      questions = questions.filter((i) => i.quizId === parseInt(req.params.quizId, 10))
    }
    questions.forEach((question) => Question.delete(question.id))
    res.status(200).json()
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    res.status(200).json(Question.delete(req.params.questionId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    res.status(200).json(Question.update(req.params.questionId, { ...req.body }))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.use('/:questionId/answers', AnswerRouter)

module.exports = router
