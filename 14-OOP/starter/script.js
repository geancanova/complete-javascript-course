'use strict';

///////////////////////////////////////
// Constructor Functions and the new Operator
/*
const Person = function (firstName, birthYear) { // constructor function
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // never create a method inside a constructor function (all instances will carry it as a duplicated one)
    // Create a prototype function instead (as seen below on 'prototypes')
    // this.calcAge = function () {
    //     console.log(2037 - this.birthYear);
    // }
};

const geancarlo = new Person('Geancarlo', 1985);
console.log(geancarlo);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

const jay = 'Jay';

console.log(jack instanceof Person) // true
console.log(jay instanceof Person) // false

Person.hey = function () {
    console.log('Hey there 👋');
    console.log(this);
}
Person.hey();
// geancarlo.hey(); // undefined (hey is not in Person prototype)

///////////////////////////////////////
// Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};

geancarlo.calcAge();
matilda.calcAge();

console.log(geancarlo.__proto__ === Person.prototype); // true

console.log(Person.prototype.isPrototypeOf(geancarlo)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// .prototyeOfLinkedObjects

Person.prototype.species = 'Homo Sapiens';
console.log(matilda.species, jack.species); // Homo Sapiens, Homo Sapiens

console.log(matilda.hasOwnProperty('firstName')); // true
console.log(matilda.hasOwnProperty('species')); // false

///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects
console.log(geancarlo.__proto__.__proto__); // Object.prototype (top of prototype chain)
console.log(geancarlo.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor);

const arr = [3, 6, 9, 12, 9, 3, 15, 18]; // new Array === []
console.log(arr.__proto__); // shows all array methods
console.log(arr.__proto__ === Array.prototype); // true (arr inherits methods from Array constructor prototype)

console.log(arr.__proto__.__proto__); // Object prototype

Array.prototype.unique = function () {
    return [...new Set(this)];
};

console.log(arr.unique()); // [3, 6, 9, 12, 15, 18]

const title = document.querySelector('h1');
console.dir(title); // Prototype chain: HTMLHeadingElement => HTMLElement => Element => Node => EventTarget => object
console.dir(x => x = 1); // Prototype contains functions methods
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
/*
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed
};

Car.prototype.accelerate = function () {
    console.log(`${this.make} is going at ${this.speed += 10} km/h`);
};

Car.prototype.brake = function (curSpeed = this.speed, curCar = this.make) {
    curSpeed = this.speed -= 5;

    if (curSpeed <= 0)
        console.log(`${curCar} has stopped`);
    else
        console.log(`${curCar} is going at ${curSpeed} km/h`);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

console.log(car1);
car1.accelerate();
car1.accelerate();
car1.brake();
car1.accelerate();
car1.accelerate();
car1.accelerate();
car1.brake();
car1.brake();
car1.brake();
car1.brake();
car1.brake();

console.log(car2);
car2.accelerate();
car2.accelerate();
car2.brake();
car2.accelerate();
car2.accelerate();
car2.accelerate();
car2.brake();
car2.brake();
car2.brake();
car2.brake();
car2.brake();
car2.brake();
car2.brake();
*/

///////////////////////////////////////
// ES6 Classes

// Class expression
// const PersonCl = class {}

// Class declaration
/*
class PersonCL {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Instance methods
    // Methods will be added to .prototype property
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    greet() {
        console.log(`Hey ${this.fullName}`);
    }

    get age() {
        return 2037 - this.birthYear;
    }

    // Set a property that already exists
    set fullName(name) {
        if (name.includes(' ')) this._fullName = name; // underescore as a convention to prevent error when uses a property that already exists
        else alert(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName;
    }

    // Static method
    static hey() {
        console.log('Hey there 👋');
        console.log(this);
    }
}

const jessica = new PersonCL('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCL.prototype); // true

// PersonCL.prototype.greet = function () {
//     console.log(`Hey ${this.firstName}`);
// }
jessica.greet();

// 1. Classes are NOT hoisted (can't be used before are declared in code (function declarations can))
// 2. Classes are first-class citizens (we can pass them into functions and also return them from functions)
// 3. Classes are executed in strict mode

const walter = new PersonCL('Walter White', 1965);

PersonCL.hey();
*/

///////////////////////////////////////
// Setters and Getters
/*
const account = {
    owner: 'jonas',
    movements: [200, 400, 120, 700],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    }
}

console.log(account.latest);

account.latest = 50;
console.log(account.movements);
*/
/*
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 1985;
steven.calcAge();
console.log(steven.__proto__ === PersonProto); // true

const sarah = Object.create(PersonProto); // PersonProto is now Prototype of sarah
sarah.init('Sarah', 1997);
sarah.calcAge();
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
/*
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        console.log(`${this.make} is going at ${this.speed += 10} km/h`);
    }
    
    brake(curSpeed = this.speed, curCar = this.make) {
        curSpeed = this.speed -= 5;
    
        if (curSpeed <= 0)
            console.log(`${curCar} has stopped`);
        else
            console.log(`${curCar} is going at ${curSpeed} km/h`);
    }

    get speedUS() {
        return this.speed / 1.6;
    }

    // 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
    set speedUS(curSpeed) {
        this.speed = curSpeed * 1.6;
    }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
console.log(ford.speedUS);
ford.accelerate();
ford.brake();
ford.brake();
ford.accelerate();
ford.accelerate();
ford.speedUS = 50;
console.log(ford);
ford.accelerate();
ford.accelerate();
*/

///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};

const Student = function(firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
}

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);

mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true

Student.prototype.constructor = Student;

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed
};

Car.prototype.accelerate = function () {
    console.log(`${this.make} is going at ${this.speed += 10} km/h`);
};

Car.prototype.brake = function (curSpeed = this.speed, curCar = this.make) {
    curSpeed = this.speed -= 5;

    if (curSpeed <= 0)
        console.log(`${curCar} has stopped`);
    else
        console.log(`${curCar} is going at ${curSpeed} km/h`);
};

const EV = function(make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
};

const tesla = new EV('Tesla', 120, 23);

console.log(tesla);
tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.accelerate();
tesla.chargeBattery(90);
console.log(tesla);
tesla.accelerate();
console.log(tesla);

// EV.prototype.constructor = EV;
// console.dir(EV);
