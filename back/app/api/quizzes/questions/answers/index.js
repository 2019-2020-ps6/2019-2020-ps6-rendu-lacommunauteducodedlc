const { Router } = require('express')

const { Answer } = require('../../../../models')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    let answer = Answer.get()
    answer = answer.filter((i) => i.questionId === parseInt(req.params.questionId, 10))
    res.status(200).json(answer)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:answerId', (req, res) => {
  try {
    res.status(200).json(Answer.getById(req.params.answerId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    req.body.questionId = parseInt(req.params.questionId, 10)
    const answer = Answer.create({ ...req.body })
    res.status(201).json(answer)
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
    let answers = Answer.get()
    answers = answers.filter((i) => i.questionId === parseInt(req.params.questionId, 10))
    answers.forEach((answer) => Answer.delete(answer.id))
    res.status(200).json()
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:answerId', (req, res) => {
  try {
    res.status(200).json(Answer.delete(req.params.answerId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:answerId', (req, res) => {
  try {
    res.status(200).json(Answer.update(req.params.answerId, { ...req.body }))
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
