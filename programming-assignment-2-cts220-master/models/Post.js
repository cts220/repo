const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new mongoose.Schema({

//Place your Schema here

    post_id: Number, //was String
    title: String,
    body: String,
    author: String,
    date: Date,
    comments:[
        {
            comment_id: Number,
            title: String,
            body: String,
            author: String,
            Date: Date
        }
    ]
 });

const Post = mongoose.model('Post', postSchema, 'postCollection');
module.exports = Post;
