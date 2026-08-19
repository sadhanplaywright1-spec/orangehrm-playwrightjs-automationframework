const Ajv =
require('ajv');
class JsonSchemaValidator {
static validate(
schema,
response
){
const ajv =
new Ajv();
const validate =
ajv.compile(schema);
const valid =
validate(response);
if(!valid){
throw new Error(
JSON.stringify(
validate.errors
)
);
}
}
}
module.exports =
JsonSchemaValidator;