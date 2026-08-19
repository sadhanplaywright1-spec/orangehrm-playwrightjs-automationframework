const fs = require('fs');
class PayloadBuilder {
static build(
path,
data
){
let payload =
fs.readFileSync(
path,
'utf8'
);
for(const key of Object.keys(data)){
payload =
payload.replaceAll(
'${'+key+'}',
data[key]
);
}
return JSON.parse(payload);
}
}
module.exports = PayloadBuilder;