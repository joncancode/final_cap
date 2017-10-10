'use strict';

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const itemErrorSchema = new Schema({ 
  code: String,
  message: String
});

itemErrorSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    code: this.code,
    message: this.message
  };
};

const ItemError = mongoose.model('item-error', itemErrorSchema);
module.exports = {ItemError};