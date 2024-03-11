const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
   user: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    alert:{
        type: Schema.Types.ObjectId,
        ref: 'Alert'
    }

})

const Comment = mongoose.model( 'Comment',commentSchema );
module.exports = Comment;
