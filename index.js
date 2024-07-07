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
        useUnifiedTopology: true
      });
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error("ERROR in the connectDB() -> " + err.message);
      process.exit(1); // Exit process with failure
    }
  };
connectDB(); //connections...


server.listen(PORT,()=>console.log(`Server is running on ${PORT}`));