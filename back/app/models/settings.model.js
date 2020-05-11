const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Settings', {

  userId: Joi.number(),
  name: Joi.string(),

  fontSizeText: Joi.string().default('font-size-basic-text'),
  fontSizeSubtitle: Joi.string().allow('', null).empty(['', null]).default('font-size-basic-subtitle'),
  fontSizeTitle: Joi.string().allow('', null).empty(['', null]).default('font-size-basic-title'),
  fontSizeSubtext: Joi.string().allow('', null).empty(['', null]).default('font-size-basic-subtext'),
  fontSizeAnswer: Joi.string().allow('', null).empty(['', null]).default('font-size-basic-answer'),
  fontSizeButton: Joi.string().allow('', null).empty(['', null]).default('font-size-basic-button'),
  selectorSize: Joi.string().allow('', null).empty(['', null]).default('font-size-basic-selector'),
  radioRadius: Joi.string().allow('', null).empty(['', null]).default('font-size-basic-radio'),
  scrollSize: Joi.string().allow('', null).empty(['', null]).default('font-size-basic-scroll'),

  fontStyle: Joi.string().allow('', null).empty(['', null]).default('font-style-basic'),

  colorBackground: Joi.string().allow('', null).empty(['', null]).default('color-basic-background'),
  colorHeader: Joi.string().allow('', null).empty(['', null]).default('color-basic-header'),
  colorYes: Joi.string().allow('', null).empty(['', null]).default('color-basic-yes'),
  colorNo: Joi.string().allow('', null).empty(['', null]).default('color-basic-no'),
  colorButton: Joi.string().allow('', null).empty(['', null]).default('color-basic-button'),
  colorCard: Joi.string().allow('', null).empty(['', null]).default('color-basic-card'),
  colorScroll: Joi.string().allow('', null).empty(['', null]).default('color-basic-scroll'),

  questionNumber: Joi.number().allow(0, null).empty([0, null]).default(6),
  answerNumber: Joi.number().allow(0, null).empty([0, null]).default(6)
});
