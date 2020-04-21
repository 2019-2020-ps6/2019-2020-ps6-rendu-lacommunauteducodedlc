const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const QuestionRouter = require('./quizzes/questions')
const AnswerRouter = require('./quizzes/questions/answers')
const UserRouter = require('./users')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/questions', QuestionRouter)
router.use('/answers', AnswerRouter)
router.use('/users', UserRouter)

module.exports = router
