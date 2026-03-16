const mongoose = require('mongoose');

// definition of schema for addresses
const addressSchema = new mongoose.Schema({
    number : { type : Number, min : 1 },      // properties : here 'type' and 'min' accepted value
    street : String,                          // properties declaratiojn is simplified when only type
    zip : Number,
    town : { type : String, required : true}  // 'required' property
});

// export the schema
module.exports = addressSchema;
