const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Settings', {

  userId: Joi.number().required(),
  name: Joi.string(),

  fontSizeText: Joi.string().required(),
  fontSizeSubtitle:Joi.string().required(),
  fontSizeTitle: Joi.string().required(),
  fontSizeSubtext: Joi.string().required(),
  fontSizeButton: Joi.string().required(),
  selectorSize: Joi.string().required(),
  radioRadius: Joi.string().required(),

  fontStyle:Joi.string().required(),

  colorBackground: Joi.string().required(),
  colorHeader: Joi.string().required(),
  colorYes: Joi.string().required(),
  colorNo: Joi.string().required(),
  colorButton: Joi.string().required(),
  colorCard: Joi.string().required(),

  questionNumber: Joi.number().required()
})