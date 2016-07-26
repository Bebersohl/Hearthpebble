/* eslint-env mocha*/
const chai = require('chai');
const expect = chai.expect;
const Game = require('../game.js');
const getTestData = require('../test-data.js');

describe('game constructor', () => {
  it('creates a new game', () => {
    const game = new Game([
      {
        name: 'Tom',
        playerClass: 'Hunter',
        deck: [],
      }, {
        name: 'Bob',
        playerClass: 'Mage',
        deck: [],
      }]);
    expect(game.players).to.have.lengthOf(2);
    expect(game.players[0].board).to.have.lengthOf(2);
    expect(game.players[1].board).to.have.lengthOf(2);
  });
});
describe('game emit start', () => {
  let game;
  beforeEach((done) => {
    getTestData((results) => {
      game = results;
      done();
    });
  });
  it('draws intial cards', () => {
    game.emit('start');
    expect(game.players[0].hand).to.have.lengthOf(3);
    expect(game.players[1].hand).to.have.lengthOf(4);
  });
});
describe('game emit new turn', () => {
  let game;
  beforeEach((done) => {
    getTestData((results) => {
      game = results;
      done();
    });
  });
  it('draws the player a card', () => {
    game.emit('new turn');
    expect(game.players[0].hand).to.have.lengthOf(1);
    game.emit('new turn');
    expect(game.players[1].hand).to.have.lengthOf(1);
  });
  it('gives the player mana', () => {
    game.emit('new turn');
    expect(game.players[0].mana).to.equal(1);
    game.emit('new turn');
    expect(game.players[1].mana).to.equal(1);
  });
  it('sets players minions hasAction to true', () => {
    game.emit('new turn');
    expect(game.players[0].board[0].hasAction).to.equal(true);
    expect(game.players[0].board[1].hasAction).to.equal(true);
  });
});
