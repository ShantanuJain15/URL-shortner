const express = require('express')
const mongoose= require('mongoose')
const path = require('path');
const URL=require('./model.js')
const { nanoid } = require('nanoid')
const bodyParser = require('body-parser');

require('dotenv').config()
// console.log(process.env) 
const PORT=process.env.PORT || 5000;
const server=express();

server.use(express.json()); // middleware for reading JSon Object
server.use(bodyParser.urlencoded({ extended: true }));//Returns middleware that only parses urlencoded bodies and
                                                      // only looks at requests where the Content-Type header matches the type option
// server.use(express.static(path.join(__dirname, 'view'))); i don't know the use;

//connect the mongoDb 
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error("ERROR in the connectDB() -> " + err.message);
      process.exit(1); // Exit process with failure
    }
  };
connectDB(); //connections..

server.get('/',(req,res)=>{
  return res.status(202).sendFile(path.join(__dirname, 'view', 'index.html'));
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
  console.log(nanoId);
  try{
  const entry = await URL.findOneAndUpdate(
    {
      nanoId
    },{
      $inc:{clickCount: 1}
    }
  );
  if(entry==null)res.sendStatus(404);
  console.log(entry.clickCount+1);
  res.redirect(entry.originalUrl);
}catch(err){

  console.log("err in finding and update the click count : "+err);

}
 
});


server.listen(PORT,()=>console.log(`Server is running on ${PORT}`));