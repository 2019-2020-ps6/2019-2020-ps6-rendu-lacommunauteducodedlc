const { Router } = require('express')

const { Admin } = require('../../models')

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(Admin.get())
    } catch (err) {
        res.status(500).json(err)
    }
})
  
router.post('/', (req, res) => {
    try {
      const admin = Admin.create({ ...req.body })
      console.log(admin)
      res.status(201).json(admin)
    } catch (err) {
      console.log(err)
      if (err.name === 'ValidationError') {
        res.status(400).json(err.extra)
      } else {
        res.status(500).json(err)
      }
    }
})

module.exports = router