'use strict';

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const itemSchema = new Schema({ 
  title: { type: String, required: true},
  currency: { type: Number, required: true},
  upc: { type: Number, required: true},
  user_data: [],
  images: [],
});

itemSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    id: this._id,
    currency: this.price,
    upc: this.upcCode,
    user_data: this.user_data    
  };
};

const Item = mongoose.model('items', itemSchema);
module.exports = {Item};
