const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv")
const config = require("./server.config.js");
const routes = require("./routes");

const app= express()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes)


const  PORT = process.env.PORT || 5000;

console.log("Starting server", config.uri)

app.listen(PORT, ()=>console.log(`server started on port ${PORT}`))

console.log("conecting to database")

mongoose.connect("mongodb+srv://rinalditomas:Coto2510@cluster0.vyml5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)return console.log(err)
    console.log("MongoDB conection established")
})