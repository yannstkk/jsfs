const mongoose = require('mongoose');

const AddressSchema = require('./address');  // import schema

// definition of schema for persons
const personSchema = new mongoose.Schema({
    name : {
            type : String,
            required : true
           },
    surnames : {
                type : [String],             // type is an Array of String
                get : v => v.join(', ')      // 'get' is a function applied each time the value is accessed to
              },
    age : {
           type : Number,
           default : 18,
           set : v => Math.floor(v)           // 'set' property is a function applied each time a new value is assigned
         },
    birth : Date,
    address : AddressSchema                   // use another schema ('addressSchema') as a type for subdocument
});

personSchema.methods.fullName = function() {   // add a *tool* function to the schema
	return `${this.firstnames} ${this.surname}`;
}

module.exports = personSchema;
