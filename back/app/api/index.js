const { Router } = require('express')
const SettingsRouter = require('./settings')
const QuizzesRouter = require('./quizzes')
const QuestionRouter = require('./quizzes/questions')
const AnswerRouter = require('./quizzes/questions/answers')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.user('/settings', SettingsRouter)
router.use('/quizzes', QuizzesRouter)
router.use('/questions', QuestionRouter)
router.use('/answers', AnswerRouter)

module.exports = router
