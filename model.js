const mongoose = require('mongoose');

const urlSchema=new mongoose.Schema({ 
    nanoId :{
      type : 'string',
      unique : true,
      required : true
    },
    shortUrl :{
        type : 'string',
        unique : true,
        required : true
    },
    originalUrl:{
        type : 'string',
        required : true
    },
    creationDate: {
        type: Date,
        default: Date.now
      },
      expirationDate: {
        type: Date
      },
      clickCount: {
        type: Number,
        default: 1
      }
  });

const URL = mongoose.model("url", urlSchema);

module.exports = URL;