const express = require("express");
const connectDB = require("./db/connect")
const app = express();
const cors = require('cors');
const product_routes = require("./routes/product");
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.get('/',(req,res)=>{
  res.send("Hi, I am live");
})

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
connectDB();
app.use("/api",product_routes)

const start = async()=>{
  try{
   app.listen(port,()=>{
    console.log(`${port} I am listening`);
   });
  }catch(error){
    console.log(error)
  }
}

start();
