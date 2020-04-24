const { Router } = require('express')

const { Settings } = require('../../models')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Settings.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/default', (req, res) => {
  try {
    let set = Settings.create({id: 1})
    res.status(200).json(set)
    Settings.delete(set.id);
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:settingsId', (req, res) => {
  try {
    res.status(200).json(Settings.getById(req.params.settingsId))
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const settings = Settings.create({ ...req.body })
    res.status(201).json(settings)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:settingsId', (req, res) => {
  try {
    res.status(200).json(Settings.delete(req.params.settingsId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:settingsId', (req, res) => {
  try {
    res.status(200).json(Settings.update(req.params.settingsId, { ...req.body }))
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
