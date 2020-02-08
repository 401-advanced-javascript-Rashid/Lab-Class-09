'use strict';


class Mongo {

  constructor(schema){
    this.schema = schema ;
  }

  
  create(value){
    let newValue = new this.schema(value);
    return newValue.save() ;
  }

  get(_id){
    if(_id){
      return this.schema.find({_id});

    }else{
      return this.schema.find({});
    }
  }

  update(_id , value){
    return this.schema.findByIdAndUpdate(_id , value , {new : true });
  }

  delete(_id){
    return this.schema.findOneAndDelete(_id);
  }
}


module.exports= Mongo ;