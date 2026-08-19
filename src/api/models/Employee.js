class Employee {
constructor(firstName, middleName, lastName) {
this.firstName = firstName;
this.middleName = middleName;
this.lastName = lastName;
}
toJson() {
return {
firstName: this.firstName,
middleName: this.middleName,
lastName: this.lastName
};
}
static fromJson(data) {
return new Employee(
data.firstName,
data.middleName,
data.lastName
);
}
}
module.exports = Employee;