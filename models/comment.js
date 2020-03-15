var mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
    context: String,
    author:String
});

module.exports = mongoose.model('Comment', commentSchema);