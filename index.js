const express = require('express')
const mongoose= require('mongoose')
const URL=require('./model.js')
const { nanoid } = require('nanoid')

require('dotenv').config()
// console.log(process.env) 
const PORT=process.env.PORT || 5000;
const server=express();

server.use(express.json()); // middleware for reading JSon Object
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
connectDB(); //connections..    

server.get('/',(req,res)=>{

  return res.json({check: true,nanoID : nanoid(11)});
})
server.post('/',async (req,res)=>{
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const nanoID = nanoid(11);
  let shortURL = process.env.BASE_URL + "/" + nanoID;
  // console.log({'nanoID' :  nanoID, 'shortURL': shortURL});

  await URL.create({
    nanoId: nanoID,
    shortUrl : shortURL,
    originalUrl: body.url
  })

  
  return res.json({ 'shortURL': shortURL });
});

server.get("/:nanoId", async (req, res) => {
  const nanoId = req.params.nanoId;
  const entry = await URL.findOneAndUpdate(
    {
      nanoId
    }
  );
  res.redirect(entry.originalUrl);
});


server.listen(PORT,()=>console.log(`Server is running on ${PORT}`));