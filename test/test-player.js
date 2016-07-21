/* eslint-env mocha*/

const chai = require('chai');
const expect = chai.expect;
const Player = require('../player.js');

describe('drawCards', () => {
  let player;
  beforeEach(() => {
    player = new Player('player1');
    player.board.push({ health: 30 });
    for (let i = 0; i < 30; i++) {
      player.deck.push({ card: 'card' });
    }
  });
  it('draws card(s) when deck is not empty and hand has room', () => {
    player.drawCards(1);
    expect(player.deck.length).to.equal(29);
    expect(player.hand.length).to.equal(1);
    player.drawCards(3);
    expect(player.deck.length).to.equal(26);
    expect(player.hand.length).to.equal(4);
  });
  it('draws 0 cards when hand is full and burns them', () => {
    player.drawCards(15);
    expect(player.discarded.length).to.equal(5);
    expect(player.hand.length).to.equal(10);
  });
  it('causes fatigue damage when deck is empty', () => {
    player.drawCards(31);
    expect(player.deck.length).to.equal(0);
    expect(player.board[0].health).to.equal(29);
    player.drawCards(1);
    expect(player.board[0].health).to.equal(27);
    player.drawCards(1);
    expect(player.board[0].health).to.equal(24);
  });
});
