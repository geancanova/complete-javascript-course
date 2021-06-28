'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// console.log(menu);


///////////////////////////////////////
// Coding Challenge #1

/*
We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game ('game' variable on
next page). In this challenge we're gonna work with that data.
Your tasks:

1. Create one player array for each team (variables 'players1' and
'players2')

2. The first player in any player array is the goalkeeper and the others are field
players. For Bayern Munich (team 1) create one variable ('gk') with the
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
field players

3. Create an array 'allPlayers' containing all players of both teams (22
players)

4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
new array ('players1Final') containing all the original team1 players plus
'Thiago', 'Coutinho' and 'Perisic'

5. Based on the game.odds object, create one variable for each odd (called
'team1', 'draw' and 'team2')

6. Write a function ('printGoals') that receives an arbitrary number of player
names (not an array) and prints each of them to the console, along with the
number of goals that were scored in total (number of player names passed in)

7. The team with the lower odd is more likely to win. Print to the console which
team is more likely to win, without using an if/else statement or the ternary
operator.

Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
// const [players1, players2] = game.players;
// console.log(players1);
// console.log(players2);

// // 2
// const [gk, ...fieldPlayers] = players1;
// console.log(gk);
// console.log(fieldPlayers);

// // 3
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Periscic'];
// console.log(players1Final);

// // 5
// // const {team1, x: draw, team2} = game.odds; my guess for the challenge (this works too)
// const {odds: {team1, x: draw, team2}} = game; // Challenge resolution for this item
// console.log(team1);
// console.log(draw);
// console.log(team2);

// // 6
// function printGoals(...playerNames) {
//   console.log(`${playerNames} scored a total of ${playerNames.length} goals.`);
// };
// printGoals(...game.scored);

// // test Data
// printGoals('Davies', 'Muller', 'Kimmich', ...game.scored);

// // 7
// team1 < team2 && console.log('Team 1 is more likely to win.');
// team1 > team2 && console.log('Team 1 is more likely to win.');



///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// // 1
// for (const [goal, player] of game.scored.entries()) {
//   console.log(`Goal: ${goal + 1}: ${player}`);
// }

// // 2
// const gameOdds = Object.values(game.odds);
// let gameAverage = 0;

// for (const odd of gameOdds) {
//   gameAverage += odd;
// }
// gameAverage /= gameOdds.length
// console.log(`Game average odd is equal to: ${gameAverage}`);

// // 3
// for (const [item, value] of Object.entries(game.odds)) {
//   const itemName = item === 'x' ? 'draw' : `victory ${game[item]}`;

//   console.log(`Odd of ${itemName}: ${value}`);
// }

// // BONUS
// const scorers = {};

// for (const player of game.scored) {
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1)
// }
// console.log(scorers);


///////////////////////////////////////
// Maps: Iteration
// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct 🎉'],
//   [false, 'Try again!'],
// ]);
// console.log(question);

// // Convert object to map
// console.log(Object.entries(restaurant.openingHours));
// const hoursMap = new Map(Object.entries(restaurant.openingHours));
// console.log(hoursMap);

// // Quiz app
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }
// // const answer = Number(prompt('Your answer'));
// const answer = 3;
// console.log(question.get(question.get('correct') === answer));


///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);
/*
// 1
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2
gameEvents.delete(64);
console.log(gameEvents);

// 3
console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes.`);

// 4
for (const [time, event] of gameEvents) {
  let period =  time <= 45 ? '[FIRST HALF]' : '[SECOND HALF]';
  console.log(`${period} ${time} : ${event}`);
}
*/


/*
// String Exercises
*/
/*
const capitalizeName = function(name) {
  const names = name.toLowerCase().split(' ');
  const correctNames = [];

  for (const n of names) {
    // correctNames.push( n[0].toUpperCase() + n.slice(1));
    correctNames.push(n.replace(n[0], n[0].toUpperCase()));
  }

  return correctNames.join(' ');
}

console.log(capitalizeName('maRia das doREs fERNandes camacho'));


// Padding
const maskCreditCard = function(number) {
  const str = number + '';
  const lastDigits = str.slice(-4);

  return lastDigits.padStart(str.length, '*');
}

console.log(maskCreditCard(2466897445675677));
console.log(maskCreditCard('3464575686796764756776989'));
*/


///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));


// My challenge resolution 
document.querySelector('button').addEventListener('click', function() {
  const text = document.querySelector('textarea').value;
  const words = text.split('\n'); // removes line breaks and turn string words to array

  for (const [i, word] of words.entries()) {
    const [firstWord, secondWord] = word.toLowerCase().trim().split('_'); // lower case, remove white spaces at beginning and end, split at underscore to array
    const camelCaseWords = `${firstWord}${secondWord.replace(secondWord[0], secondWord[0].toUpperCase())}`;

    console.log(`${camelCaseWords.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }

});