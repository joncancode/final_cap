'use strict';

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const itemSchema = new Schema({ 
  title: { type: String, required: true},
  currency: { type: Number, required: true},
  upc: { type: Number, required: true},
  creator: { type: String, required: true },
  stores: [],
  user_data: [],
  images: [String],
  offers: {merchant: String, availability: String}
});

itemSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    currency: this.price,
    upc: this.upcCode,
    creator: this.creator,
    stores: this.stores,
    user_data: this.user_data,
    images: this.images,
    id: this._id,
    offers: this.offers
  };
};

const Item = mongoose.model('items', itemSchema);
module.exports = {Item};
