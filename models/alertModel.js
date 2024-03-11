const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
   creator: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    pet:{
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    },
    status:{
        type: String,
        required:true,
    }

})

const Alert = mongoose.model( 'Alert',alertSchema );
module.exports = Alert;
