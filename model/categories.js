'use strict';


const Mongo = require('./Mongo.js');
const schema = require( '../schemas/categories-S.js') ;

class Catagories extends Mongo {
  constructor(){
    super(schema );
  }
}


module.exports =Catagories ;