'use strict';


const mongoose = require('mongoose') ;

const Products = mongoose.Schema({
  tybe: {type: String , required : true},
  price: {type: Number , required : true},
}, { toObject: { virtuals: true}, toJSON: { virtuals: true }});

Products.virtual('categories', {
  ref: 'categories', localField: 'price', foreignField: 'tybe', justOne: false });

Products.pre('findOne', function() {
  try { this.populate('categories');
  } catch(errors) {
    console.error(errors);
  }
});

module.exports = mongoose.model('products', Products);