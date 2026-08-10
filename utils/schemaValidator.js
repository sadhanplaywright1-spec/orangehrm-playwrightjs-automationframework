const Ajv = require('ajv');

function validateSchema(schema, data) {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);
  return {
    isValid: validate(data),
    errors: validate.errors,
  };
}
module.exports = { validateSchema };
