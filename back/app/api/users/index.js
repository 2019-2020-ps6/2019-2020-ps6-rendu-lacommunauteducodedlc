const { Router } = require('express')

const { User, Settings } = require('../../models')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(User.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:userId', (req, res) => {
  try {
    res.status(200).json(User.getById(req.params.userId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    let setId = (req.body.settingsId) ? req.body.settingsId : Date.now();
    req.body.settingsId = setId;
    const user = User.create({ ...req.body })
    const settings = Settings.create({id: setId})
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:userId', (req, res) => {
  try {
    let user = User.getById(req.params.userId);
    Settings.delete(user.settingsId);
    res.status(200).json(User.delete(req.params.userId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:userId', (req, res) => {
  try {
    res.status(200).json(User.update(req.params.userId, { ...req.body }))
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
