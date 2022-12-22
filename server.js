//const app = require("./app");
const mongoose = require("mongoose");
const postModel = require("./schema")
const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Configurations for "body-parser"
// app.use(
//     bodyParser.urlencoded({
//       extended: true,
//     })
// );
//middleware 
app.use(express.json({limit: "30mb", extended: true}));
app.use(cors());
app.use(express.urlencoded({extended:false}));

// process.on("uncaughtException", (err) => {
//   console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
//   console.log(err.message, err.name);
//   process.exit(1);
// });



//database
mongoose.connect(process.env.MONGOKEY, (db)=> {
    console.log("connected to db")
}, (err)=> {
    console.log(err);
});

// const DB = "mongodb://localhost/instaclone";

// mongoose
//   .connect(DB, {
//     useCreateIndex: true,
//     useFindAndModify: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     autoIndex: true,
//   })
//   .then(() => {
//     console.log("DB connected successfully");
//   });

const port = process.env.PORT || 3005;

const server = app.listen(port, () => {
  console.log("Server is up listening on port:" + port);
});

app.get("/postform", (req,res)=>{
    postModel.find().sort({time : 1}).then((post)=> {
        res.status(200).send( post );
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

//post data
//http://localhost:3005/postform
app.post("/postform",(req,res)=>{
    const postdate = new Date();
    let datepost = postdate + ""
    datepost = datepost.split(" ");
    datepost = datepost.splice(1, 3).join(" ");

    postModel.create({
        image : req.body.image,
        likes: req.body.likes,
        author: req.body.author,
        date: datepost,
        location: req.body.location,
        description : req.body.description
    }).then((db)=>{
        res.status(200).send("Post Created Successfully")
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

