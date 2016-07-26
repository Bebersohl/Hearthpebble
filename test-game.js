/* eslint-env node*/
const readline = require('readline');
const colors = require('colors/safe');
const getTestData = require('./test-data.js');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let game;

function printGame() {
  const p1 = game.players[0];
  const p2 = game.players[1];
  const pHands = ['', ''];
  for (let i = 0; i < game.players.length; i++) {
    for (const card of game.players[i].hand) {
      pHands[i] += `${card.name} (${colors.cyan(card.cost)}/${colors.red(card.health||'_')}/${colors.yellow(card.attack||'_')}), `;
    }
  }
  console.log(`
${pHands[0]}

${colors.red(p1.board[0].health)}  -  ${p1.board[0].name} (${p1.board[0].playerClass})  -  ${colors.cyan(p1.mana)}/${colors.cyan(p1.manaCap)}

----------------------------------------------------------------------------

${colors.red(p1.board[0].health)}  -  ${p2.board[0].name} (${p2.board[0].playerClass})  -  ${colors.cyan(p1.mana)}/${colors.cyan(p2.manaCap)}

${pHands[1]}
  `);
}

getTestData((results) => {
  game = results;
  game.emit('start');
  printGame();
  // rl.question('What do you want to mulligan? ', (answer) => {
  //   console.log('Thank you for your valuable feedback:', answer);
  //   rl.close();
  // });
});
