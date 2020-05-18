const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Admin', {
    adminId: Joi.string().required(),
    password: Joi.string().required(),
})