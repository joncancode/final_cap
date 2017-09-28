'use strict';

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const productSchema = new Schema({ 
    name: { type: String, required: true}

});

const Products = mongoose.model('Products', productSchema);

productSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.name
  };
};

module.exports = {Products};
