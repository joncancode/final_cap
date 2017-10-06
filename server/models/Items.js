'use strict';

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const itemSchema = new Schema({ 
    itemName: { type: String, required: true},
    creator: String,
    price: { type: Number, required: true},
    upcCode: { type: Number, required: true},
    image: { data: Buffer, contentType: String},
    stores: []
});

const Items = mongoose.model('Products', itemSchema);

itemSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.name
  };
};

module.exports = {Items};
