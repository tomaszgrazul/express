const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    title: String,
    content: String,
    // author: String
    // createdAT: Date
    // createdAT: {type: Date, defaultl new Date()}
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', Post);