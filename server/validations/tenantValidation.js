const Joi = require('joi');

const tenantSchema = Joi.object({
  // Stub
  name: Joi.string().required()
});

exports.validateTenant = (req, res, next) => {
  // TODO
  next();
};

module.exports = {
  validateTenant
};

