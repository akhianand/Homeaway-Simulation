/* -----------------------------------------------------------------------------------------------------------
                                                Initializations             
-----------------------------------------------------------------------------------------------------------*/
var mysql = require("mysql");
var bcrypt = require("bcrypt");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//Express Sessions
app.use(session({
    secret: 'tobeornottobethatisthequestion',
    resave: false,
    saveUninitialized: true
}));

//MySql DB Connections
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "homeaway"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected Sucessfully to Database");
});


var server = app.listen(8000, function() {
    console.log("Server listening on port 8000");
  });
/* -----------------------------------------------------------------------------------------------------------
                                                     Methods             
-----------------------------------------------------------------------------------------------------------*/

var createNewLightUserObject = (email, password, fname, lname) => {
  return new Promise(function(resolve, reject) {
    const saltRounds = 12;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (!err) {
          var newUser = {
            ufname: fname,
            ulname: lname,
            uemail: email,
            upasswordhash: hash
          };
          resolve(newUser);
        } else {
          reject(err);
        }
      });
    });
  });
};

var isPresentInDatabase = email => {
  return new Promise(function(resolve, reject) {
    con.query("SELECT uemail,upasswordhash FROM User_Table WHERE uemail = ?", email, function(
      err,
      rows
    ) {
      if (!err) {
        resolve(rows);
      } else {
        reject(err);
      }
    });
  });
};

var addNewLightUserObjectToDatabase = newUser => {
  return new Promise(function(resolve, reject) {
    con.query("INSERT INTO User_Table SET ?", newUser, function(err, result) {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};


var comparePasswords= (password,hash) =>{
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, hash, function(err, res) {
            if(!err){
                resolve(res)
            }else{
                reject(err);
            }
        });
    });
}

/* -----------------------------------------------------------------------------------------------------------
                                                     Routes             
-----------------------------------------------------------------------------------------------------------*/




app.post("/addUserLight", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;

  isPresentInDatabase(email)
    .then(rows => {
      if (rows.length) { //If User Exists
        console.log("User Already Exists");
      } else {
        createNewLightUserObject(email, password, fname, lname)
          .then(newUser => {
            addNewLightUserObjectToDatabase(newUser)
              .then(result => {
                console.log("Result" + result);
              })
              .catch(err => {
                console.log(
                  "An Error was Encountered While Adding Light User Object to Database Error:" +
                    err
                );
              });
          })
          .catch(err => {
            console.log(
              "An Error was Encountered While Creating Light User Object. Error:" +
                err
            );
          });
      }
    })
    .catch(err => {
      console.log(
        "An Error was Encountered While Checking if User is Present in Database. Error:" +
          err
      );
    });

});


app.post('/login', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    isPresentInDatabase(email).then(rows =>{
        if(rows.length){
            comparePasswords(password, rows[0].upasswordhash).then(res =>{
                if(res){ 
                    //Password is Correct
                }else{
                    //Password is Wrong
                }
            }).catch(err =>{
                console.log("Error: "+err);
            });

        }else{
            console.log(
                "Looks Like User Hasn't Registered With us"
              ); 
        }
    }).catch(err=>{
        console.log(
            "An Error was Encountered While Checking if User is Present in Database. Error:" +
              err
          );
    })

});



