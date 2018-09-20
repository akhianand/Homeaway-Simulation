/* -----------------------------------------------------------------------------------------------------------
                                                Initializations             
-----------------------------------------------------------------------------------------------------------*/
var mysql = require("mysql");
var bcrypt = require("bcryptjs");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors');
var session = require('express-session');


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//Express Sessions
app.use(session({
  secret              : 'Tobeornottobethatisthequestion',
  resave              : false, 
  saveUninitialized   : false, 
  duration            : Date.now() + 2 * 60 * 60 * 1000, 
  activeDuration      : Date.now() + 30 * 60 * 1000 //1/2 Hour
}));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});



 

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

var updateUserObjectToDatabase = (newUser,email) => {
  return new Promise(function(resolve, reject) {
    con.query("UPDATE User_Table SET ? WHERE uemail = '"+email+"'" , newUser, function(err, result) {
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

var getUserInformationFromDatabase = email => {
  return new Promise(function(resolve, reject) {
    con.query("SELECT * FROM User_Table WHERE uemail = ?", email, function(
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


/* -----------------------------------------------------------------------------------------------------------
                                                     Routes             
-----------------------------------------------------------------------------------------------------------*/




app.post("/addUserLight", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;

  isPresentInDatabase(email).then(rows => {
      if (rows.length) { //If User Exists
         console.log("User Already Exists");
         res.status(200).json({
          success: false,
          error: 'This User Already Exists',
      });
      } 
      
      
      else {
        createNewLightUserObject(email, password, fname, lname)
          .then(newUser => {
            addNewLightUserObjectToDatabase(newUser)
              .then(result => {
                console.log("Result" + result);
                res.cookie('cookie',email,{maxAge: 60 * 60 * 1000, httpOnly: false, path : '/'});
                req.session.user = email;
                res.status(200).json({
                  success: true,
                  email
              });
              })
              .catch(err => {
                console.log(
                  "An Error was Encountered While Adding Light User Object to Database Error:" +
                    err
                );
                res.status(400).json({
                  success: false,
                  err
              });
              });
          })
          .catch(err => {
            console.log(
              "An Error was Encountered While Creating Light User Object. Error:" +
                err
            );
            res.status(400).json({
              success: false,
              err
          });
          });
      }
    })
    .catch(err => {
      console.log(
        "An Error was Encountered While Checking if User is Present in Database. Error:" +
          err
      );
      res.status(400).json({
        success: false,
        err
    });
    });
});



app.post("/addUserHeavy", function(req, res) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const about = req.body.about;
  const phone = req.body.phonenumber;
  const gender = req.body.gender;
  const mycity = req.body.mycity;
  const school = req.body.school;
  const aboutme = req.body.aboutme;
  const company = req.body.company;
  const hometown = req.body.hometown;
  const languages = req.body.languages;
  
  var User = {
    ufname : fname,
    ulname : lname,
    uabout : about,
    ucity : mycity,
    ucompany:company,
    uschool:school,
    uhometown:hometown,
    ulanguages:languages,
    ugender: gender,
    uphone:phone,
    uabout:aboutme
  };

  updateUserObjectToDatabase(User,email).then(result=>{
    res.status(200).json({
      success: true,
      result
  });
  }).catch(error=>{
    console.log(error);
    res.status(400).json({
      success: true,
      error
  });
  });
      
      
});


app.post('/login', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    isPresentInDatabase(email).then(rows =>{
        if(rows.length){
            comparePasswords(password, rows[0].upasswordhash).then(resp =>{
                if(resp){ 
                res.cookie('cookie',email,{maxAge: 60 * 60 * 1000, httpOnly: false, path : '/'});
                req.session.user = email;
                res.status(200).json({
                  success: true,
                  email
              });
                }else{
                  res.status(200).json({
                    success: false,
                    error: 'Passwords Dont Match!',
                });
                }
            }).catch(err =>{
              res.status(400).json({
                success: false,
                err
            });
            });

        }else{
          res.status(200).json({
            success: false,
            error: 'This User does not exist',
        });
        }
    }).catch(err=>{
        console.log(
            "An Error was Encountered While Checking if User is Present in Database. Error:" +
              err
          );
          res.status(400).json({
            success: false,
            err
        });
    })

});


app.post('/getUserInfo', function (req, res) {
  const email = req.body.email;
  getUserInformationFromDatabase(email).then(rows=>{
    if(rows.length){
      let data ={lname: rows[0].ulname,
      fname: rows[0].ufname,
      membersince: "2018",
      aboutme:rows[0].uabout,
      mycity:rows[0].ucity,
      company:rows[0].ucompany,
      school:rows[0].uschool,
      hometown:rows[0].uhometown,
      languages:rows[0].ulanguages,
      gender:rows[0].ugender,
      phonenumber:rows[0].uphone
    }
    res.status(200).json({
      success: true,
      data
  });


    }
  }).catch(err =>{
    res.status(200).json({
      success: false,
      error
  });

  });

  
});



