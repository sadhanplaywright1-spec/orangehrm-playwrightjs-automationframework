class ResponseLogger {
static async log(response){
const body =
await response.json();
console.log("STATUS");
console.log(response.status());
console.log("BODY");
console.log(body);
}
}
module.exports =ResponseLogger;