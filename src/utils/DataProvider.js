const fs = require("fs");
class DataProvider {
static getJsonData(path){
return JSON.parse(
fs.readFileSync(path,"utf8")
);
}
}
module.exports = DataProvider;