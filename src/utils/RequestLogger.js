class RequestLogger {
static log(url,payload){
console.log("REQUEST URL");
console.log(url);
console.log("REQUEST BODY");
console.log(
JSON.stringify(
payload,
null,
)
);
}
}
module.exports = RequestLogger;