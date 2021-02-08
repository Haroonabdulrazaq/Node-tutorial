
const express= require('express');
const path = require('path');
const session = requre('express-session');
const passport =require('passport');
const LocalStrategy =require('passport-local').Strategy;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoDb = 'mongodb+srv://Haroonabdulrazaq:haroon123@cluster0.4o3qm.mongodb.net/AuthDB?retryWrites=true&w=majority';
mongoose.connect(mongoDb, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection();

db.on("error", console.error.bind(console, "mongo connection error"));

const User = mongoose.model(
  "User",
  new Schema ({
    username: {type: String, required: true},
    password: {type: String, required: true}
  })
)