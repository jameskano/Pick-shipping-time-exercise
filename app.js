// jshint esversion:9

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.set("view engine", "ejs");


// mongoose.connect("mongodb://localhost:27017/ejercicio1", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.connect("mongodb+srv://admin-jaime:pass-jaime@cluster0.8rexg.mongodb.net/ejercicio1?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const horariosSchema = new mongoose.Schema({
  Hora: String,
  motoristas: Number
});

const Horarios = mongoose.model("Horarios", horariosSchema);


app.get('/favicon.ico', function(req, res) { res.status(204); });

app.get("/", function(req, res) {
  Horarios.find(function(err, data) {
    if(err) {
      console.log(err);
    }
    else {
      res.render("index", {
        data: data
      });
    }
  });
});

app.post("/", function(req, res) {
  let update = req.body.update;
  let updatedValue = req.body.updatedValue;

  Horarios.findByIdAndUpdate(update, {motoristas: updatedValue}, function(err, data) {
    if(err) {
      console.log(err);
    }
    else {
      console.log(data);
      res.redirect("/");
    }
  });
});


app.listen(3000, function(req, res) {
  console.log("Server is running on port 3000");
});
