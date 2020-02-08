
'use strict';


const mongoose = require('mongoose');

const Categories = mongoose.Schema({
  name : {type : String , required : true},
},{ toObject: { virtuals: true }, toJSON: { virtuals: true }});

Categories.virtual('products' , {
  ref: 'products', localField: 'name', foreignField: 'type', justOne: true,
});

function link(){
  try{ this.populate('products');
  } catch (errors){
    console.error(errors);
  }
} 

Categories.pre('find', link);
Categories.pre('findOne', link);

module.exports = mongoose.model('categories', Categories);