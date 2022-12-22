const { Module } = require("module");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    image: String,
    likes: {type:Number, default:333},
    date: String,
    author: String,
    location: String,
    description: String
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
