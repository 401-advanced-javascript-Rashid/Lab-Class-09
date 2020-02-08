'use strict';

const Mongo = require('./Mongo.js');
const schema = require('../schemas/products-S.js') ;

class Products extends Mongo {
  constructor(){
    super(schema );
  }
}


module.exports = Products;