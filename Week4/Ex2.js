class Person {
    constructor(name) {
        this.name = name;
    }
    planet = "Земя";
    printPerson() {
        console.log(`Здравей ${this.name} от планетата ${this.planet}`)
    }
}

let p1 = new Person("Чък Норис");
p1.printPerson();

let p2 = new Person("Пешо Пешов");
p2.printPerson();

let p3 = new Person("Гошо Гошов");
p3.printPerson();