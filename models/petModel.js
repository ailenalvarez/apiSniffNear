const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const petSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    raza: {
        type: String,
        required: true,
    },
    age:String,
    description:String,
    created: {
        type: Date,
        default: Date.now 
    } ,
    owner:{
        type : Schema.Types.ObjectId , 
        ref:'User'
    }
})

const Pet = mongoose.model( 'Pet', petSchema );

module.exports = Pet;