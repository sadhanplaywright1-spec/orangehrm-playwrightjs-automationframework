class PayloadBuilder {
static employee(data) {
return {
...data,
name: `${data.name}_${Date.now()}`
};
}
static updateEmployee(data) {
return {
...data,
job: 'Senior QA Engineer'
};
}
static patchEmployee() {
return {
job: 'Lead Automation Engineer'
};
}
}
module.exports = PayloadBuilder;