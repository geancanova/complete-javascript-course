'use strict';

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

// prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};

geancarlo.calcAge();
matilda.calcAge();

console.log(geancarlo.__proto__ === Person.prototype); // true

console.log(Person.prototype.isPrototypeOf(geancarlo)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

Person.prototype.species = 'Homo Sapiens';
console.log(matilda.species, jack.species); // Homo Sapiens, Homo Sapiens

console.log(matilda.hasOwnProperty('firstName')); // true
console.log(matilda.hasOwnProperty('species')); // false

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