class Person {
    getSecretSalaryInfo () {
        let _salary = 1000;
        return _salary;
    }
};

let person = new Person();

var stoleSalaryInfo = person.getSecretSalaryInfo();

console.log(person.getSecretSalaryInfo());
console.log(stoleSalaryInfo);