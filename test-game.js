/* eslint-env node*/
const readline = require('readline');
const colors = require('colors');
const getTestData = require('./test-data.js');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let game;

getTestData((results) => {
  game = results;
  rl.question('What do you want to mulligan? ', (answer) => {
    console.log('Thank you for your valuable feedback:', answer);
    rl.close();
  });
});
