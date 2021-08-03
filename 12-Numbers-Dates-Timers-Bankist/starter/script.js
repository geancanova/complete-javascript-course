'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-07-29T17:01:17.194Z',
    '2021-07-31T23:36:17.929Z',
    '2021-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  return Intl.DateTimeFormat(locale).format(date);
}

const formatCur = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(value);
}

const displayMovements = function(acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);

  });
}

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc += mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency); 

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1) // Bank pays interest only for values += 1€
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (accs) {
    accs.username = accs.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
}
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
}

const startLogOutTimer = function() {
  const tick = function() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started'
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 300;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

// Event Handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === +(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Create current day and time
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Experimenting API (above code with API)
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      // month: '2-digit' // other month format
      month: 'numeric',
      year: 'numeric', // 2-digit
      // weekday: 'long' // short, narrow
    }
    // const locale = navigator.language; // pt-BR
    labelDate.textContent = new Intl.DateTimeFormat(
      // locale, 
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

// Transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && 
      receiverAcc &&
      currentAccount.balance >= amount && 
      receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
   
    // Update UI
    updateUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// Request loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 && 
    currentAccount.movements.some(mov => mov += amount * 0.1) // amount cannot be >= 10% of the max movement value
  ) {
    setTimeout(function() {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset Timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

// Close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  
  if (
    currentAccount.username === inputCloseUsername.value && 
    currentAccount.pin === +(inputClosePin.value)
  ) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);
    
    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// Conversion
console.log(Number('23'))
console.log(+'23'); // converts to number too in a "cleaner" way

// Parsing
console.log(Number.parseInt('30px', 10)); // 30
console.log(Number.parseInt('e23', 10)); // NaN because string needs to begin with a number

console.log(Number.parseInt('2.5rem')); // 2
console.log(Number.parseFloat('2.5rem')); // 2.5 -> removes units from CSS and returns only number

// Checking if value is NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(23 / 0)); // false

// Checking if value is number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0)); // false

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger(23 / 0)); //false
*/

/*
console.log(Math.sqrt(25)); // 5 -> square root (raíz quadrada)
console.log(25 ** (1 / 2)); // 5 -> same as above
console.log(8 ** (1 / 3)); // 2 -> cubic root

console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, '23', 11, 2)); // 23 -> max does type coertion
console.log(Math.max(5, 18, '23px', 11, 2)); // 23 -> NaN

console.log(Math.min(5, 18, 23, 11, 2)); // 2

console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.1592653589793 -> area of circle formula

console.log(Math.trunc(Math.random() * 6) + 1); // random dice number example

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;  //generic function to retrieve a random number between min and max values
// 0...1 -> 0...(max - min) -> min...max
console.log(randomInt(1, 6));

// Rounding Integers
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24

console.log(Math.floor(23.3)); // 23
console.log(Math.floor(23.9)); // 23

console.log(Math.trunc(23.3)); // 23

console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // 24

// Rounding decimals
console.log((2.7).toFixed(0)); // 3 -> returns a string
console.log((2.7).toFixed(3)); // 2.700 -> returns a string
console.log((2.347).toFixed(2)); // 2.35 -> returns a string
console.log(+(2.347).toFixed(2)); // 2.35 -> plus sign in the beginning converts to Number

// All above methods do type coercion
*/

/*
// Reminder operator
console.log(5 % 2); // 1
console.log(5 / 2); // 2.5 -> 5 = 2 * 2 + 1

console.log(8 % 3); // 2
console.log(8 / 3); // 2.66... -> 8 = 2 * 3 + 2

console.log(6 % 2); // 0
console.log(6 / 2); // 3

console.log(7 % 2); // 1
console.log(7 / 2); // 3.5 -> 7 = 2 * 3 + 1

const isEven = n => n % 2 === 0; // check if a given number is Even
console.log(isEven(8)); // true
console.log(isEven(23)); // false
console.log(isEven(1024)); //true

labelBalance.addEventListener('click', function() {
  [...document.querySelectorAll('.movements__row')].forEach(function(row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    // if (i % 3 === 0) row.style.backgroundColor = 'tan';
  });
});
*/

/*
// BigInt
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER); // same as above -> max safe integer that JavaScript can handle

console.log(49849546549846548984654654984n);
console.log(BigInt(4984954654));

// BigInt Operations
console.log(10000n + 10000n);
console.log(65498916519891895165198n + 1000000n);

const huge = 21621951519519652652961n;
const num = 23;
// console.log(huge * num); // Error: Cannot mix Bigint and other types
console.log(huge * BigInt(num)); // FIx above -> use 'BigInt' constructor

// Exceptions
console.log(20n > 15); // true
console.log(20n === 20); // false
console.log(20n == '20'); // true
console.log(huge + ' is REALLY big!!!');

// Divisions
console.log(10n / 3n); // 3n
console.log(10 / 3); // 3.3333...
*/

// DATES

// Create Date
/*
const now = new Date();
console.log(now);

console.log(new Date('Aug 02 2021 11:37:34'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); // year, month (zero based), day, hour, minute, second
console.log(new Date(2037, 10, 31)); // there's no day 31, so JS corrects the date to Dec 1

console.log(new Date(0)); // Thu Jan 01 1970 GTM-0000 -> Wed Dec 31 1969 GTM-0300
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // converts days to miliseconds -> day * hours * minutes * seconds * miliseconds
*/

// Working with dates
/*
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10 (november) -> zero based
console.log(future.getDate()); // 19 -> day of the month
console.log(future.getDay()); // 4 (thursday) -> day of the week (zero based)
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0
console.log(future.toISOString()); // 2037-11-19T18:23:00.000Z

console.log(future.getTime()); // 2142267780000 -> timestamp
console.log(new Date(2142267780000)); // Thu Nov 19 2037 15:23:00 GMT-0300

console.log(Date.now()); // 1627916888022 -> current timestamp

future.setFullYear(2040); // all the above methods has its Set versions
console.log(future); //Mon Nov 19 2040 15:23:00 GMT-0300
*/

// Operations with dates
/*
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(+future); // + operator logs date in miliseconds (timestamp format)

const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);
*/

//  Intl API
/*
const num = 3884764.23;

const options = {
  style: 'currency', // percent, unit
  // unit: 'kilometer' // mile-per-hour
  unit: 'fahrenheit', // celsius
  currency: 'EUR', // BRL, USD
  // useGrouping: false
}

console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log('Brazil:  ', new Intl.NumberFormat('pt-BR', options).format(num));
console.log(navigator.language, new Intl.NumberFormat(
  navigator.language, 
  options
).format(num));
*/

// Timers: 
/*
// setTimeout
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);
console.log('Waiting...');

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// SetInterval
const interval = setInterval(function() {
  const now = new Date();
  console.log(now);
}, 1000);
clearInterval(interval);

// Mini challenge: Display Clock
const watch = setInterval(function() {
  const now = new Date();
  const formatTime = new Intl.DateTimeFormat(navigator.locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }).format(now);

  // with methods
  console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);

  // with Intl API
  console.log(formatTime);
}, 1000);
clearInterval(watch);
*/