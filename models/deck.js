const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Deck = new Schema({
  deckName: String,
  playerClass: String,
  cards: [{ _id: false,
    cardId: {
      type: Schema.Types.String,
      ref: 'Card',
      required: true,
    },
    cardCount: {
      type: Number,
      required: true },
    }],
});

module.exports = mongoose.model('Deck', Deck);
