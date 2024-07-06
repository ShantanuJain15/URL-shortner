const express = require('express')
require('dotenv').config()
// console.log(process.env) 

const server=express()


server.listen(process.env.PORT,()=>console.log("RUNNING...."));