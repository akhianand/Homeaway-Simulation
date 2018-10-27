const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
var kafka = require('./kafka/client');

const UserModel = require("../model/usermodel");

router.post("/signup", async (req, res, next) => {
  passport.authenticate("signup", { session: false }, (err, user, info) => {
    if (err || !user) {
      res.status(400).json({
        message: "Sign-Up Unsuccessful",
        success: false,
        error: info
      });
      console.log("Error Signing Up");
    } else {
      console.log(" Signing Up Sucessful");
      UserModel.findOneAndUpdate(
        { email: req.body.email },
        { $set: { fname: req.body.fname, lname: req.body.lname } },
        (err, doc) => {
          if (err) {
            res.status(200).json({
              message: "Sign-Up Partially Successful",
              success: false,
              user: err
            });
          } else {
            console.log(doc);
            res.status(200).json({
              message: "Sign-Up Successful",
              success: true,
              user: req.user
            });
          }
        }
      );
    }
  })(req, res, next);
});


router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An Error occured");
        return next(error);
      }
      req.login(user, { session: false }, async error => {
        if (error) return next(error);
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign(
          { user: body },
          "tobeornottobethatisthequestion",
          {
            expiresIn: 7200
          }
        );
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get("/uploads/:email/:photo", function(req, res, next) {
  var em = req.params.email;

  var options = {
    root: __dirname + "/uploads/" + em,
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true
    }
  };
  var fileName = req.params.photo;
  res.sendFile(fileName, options, function(err) {
    if (err) {
      next(err);
    } else {
    }
  });
});






module.exports = router;
