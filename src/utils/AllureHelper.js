const {
attachment
} = require("allure-js-commons");
class AllureHelper {
static async attachJson(
name,
data
)
{
await attachment(
name,
JSON.stringify(
data,
null,
),
'application/json'
);
}
}
module.exports = AllureHelper;