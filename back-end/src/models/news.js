const mongoose = require('../db/mongoose');
//var autoIncrement = require('mongoose-auto-increment');

const News = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "There is no description."
    },
    url: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        default: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
    },
    pub_date: {
        type: Date,
        default: Date.now()
    },
    isSports: {
        type: Boolean
    },
    author: {
        type: String,
        default: 'Unknown'
    }
    //id:{type:Number,unique:true}
});
//autoIncrement.initialize(mongoose.connection);

//News.plugin(autoIncrement.plugin,{model:"News",field:"id",startAt:1});
module.exports = mongoose.model('News', News);
