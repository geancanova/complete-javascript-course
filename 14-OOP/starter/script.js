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

