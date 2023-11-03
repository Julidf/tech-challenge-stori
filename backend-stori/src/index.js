const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const router = require("./routes/routes")
const bodyParser = require("body-parser")
const cors = require("cors")

dotenv.config()
const app = express();
const mongoURI = process.env.MONGO_URI;

app.use(cors());
app.use(bodyParser.json({limit: '1mb'})) //configuration for express to analize data in JSON format with a max of 10mb (allowing 10mb for files)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

mongoose.connect(mongoURI)
.then(() => {
  console.log('Successfully connected to MongoDB!');
})
.catch(err => {
  console.error('Error conecting to MongoDB:', err);
});

app.listen(8080, () => {console.log("Server mounted.")});

