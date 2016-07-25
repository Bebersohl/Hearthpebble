/* eslint-env node*/
const readline = require('readline');
const colors = require('colors');
const getTestData = require('./test-data.js');

let game;

getTestData((results) => {
  game = results;
  console.log('Welcome to Hearthpebble!');
});
