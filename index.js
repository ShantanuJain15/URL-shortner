const express = require('express')
const mongoose= require('mongoose')
const URL=require('./model.js')

require('dotenv').config()
// console.log(process.env) 
const PORT=process.env.PORT || 5000;
const server=express();


//connect the mongoDb 
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error(err.message);
      process.exit(1); // Exit process with failure
    }
  };



server.listen(PORT,()=>console.log(`Server is running on ${PORT}`));