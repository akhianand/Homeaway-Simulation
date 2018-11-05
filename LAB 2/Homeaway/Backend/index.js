const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
var cors = require("cors");



app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});



//Database Connection
mongoose.connect(
  "mongodb://127.0.0.1:27017/Homeaway",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    poolSize:500
  }
).then(
 
  () => { console.log("Sucessfully Connected to MogoDB");},
   
  err => { console.log("Error Connecting to MogoDB" );}
   
  );




mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


//Routes
require("./auth/auth");
const routes = require("./api/routes");
const secureRoute = require("./api/secure-routes");

app.use("/", routes);
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);


//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});


app.listen(8000, () => {
  console.log("Server Started and Listening on Port 8000");
});




