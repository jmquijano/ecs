require("dotenv").config()

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require('mongoose')
const helmet = require('helmet')
const { default: fetch } = require("node-fetch");
const jwt = require("jsonwebtoken");

const rooms = require('./routes/rooms')
const sessions = require('./routes/sessions')
const meeting = require('./routes/meeting')


const PORT = process.env.PORT ||  9000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet())

app.use('/rooms',rooms)
app.use('/sessions',sessions)
app.use('/meetings', meeting)


// 
app.get("/", (req, res) => {
    res.send("Hello World!");
});



// 
app.post("/get-token", (req, res) => {
    const {creator} = req.body
    const API_KEY = process.env.VIDEOSDK_API_KEY;
    const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;
  
    const options = { expiresIn: "1h", algorithm: "HS256" };
    console.log(creator)
    const payload = {
      apikey: API_KEY,
      permissions:creator == true ?["allow_join", "allow_mod", "ask_join"]: ["ask_join"], // also accepts "ask_join"
    };
  
    const token = jwt.sign(payload, SECRET_KEY, options);
    res.json({ token });
});
 

app.post("/create-meeting/", (req, res) => {
  const { token,region  } = req.body;
  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ region }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});

//
app.post("/validate-meeting/:meetingId",async(req, res) => {
    const token = req.body.token;
    const meetingId = req.params.meetingId;
  
    
     try {
      const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;
     
      const options = {
        method: "POST",
        headers: { Authorization: token },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      res.json(data)
     } catch (error) {
      res.status(500).json(error)
     }
  });
  
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },()=>
      console.log("connected to mongoDB")
  );

  mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
  });
    
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
  });
  

  //
  app.listen(PORT, () => {
    console.log(`API server listening at http://localhost:${PORT}`);
  });
  