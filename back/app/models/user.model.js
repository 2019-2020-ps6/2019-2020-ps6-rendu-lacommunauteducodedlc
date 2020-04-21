const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  userName: Joi.string().required(),
  settingsId: Joi.number().required(),
})
