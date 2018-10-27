const express = require("express");
var multer = require("multer");
var mkdirp = require("mkdirp");
const router = express.Router();
var kafka = require("./kafka/client");

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const dir = "api/uploads/" + req.body.email + "/";
    mkdirp(dir, err => callback(null, dir));
  },
  filename: function(req, file, callback) {
    var ext = file.originalname.split(".").pop();
    callback(null, file.fieldname + "_" + Date.now() + "." + ext);
  }
});
var upload = multer({ storage: storage });

router.post("/createNewProperty", upload.array("photos"), (req, res, next) => {
  let filenamearray = [];
  req.files.forEach(file => {
    filenamearray.push(file.filename);
  });
  const photos = filenamearray;
  let data ={
    addressline1:req.body.addressline1,
    addressline2:req.body.addressline2,
    city:req.body.city,
    state:req.body.state,
    zip:req.body.zip,
    country:req.body.country,
    phone:req.body.phone,
    headline:req.body.headline,
    description:req.body.description,
    placetype:req.body.placetype,
    bedrooms:req.body.bedrooms,
    bathrooms:req.body.bathrooms,
    accomodates:req.body.accomodates,
    currency:req.body.currency,
    baserent:req.body.nightlybaserent,
    minimumstay:req.body.minimumstay,
    availablefrom:req.body.startDate,
    availableto:req.body.endDate,
    photos,
    email:req.body.email
  }
  console.log("Making Request To Kafka...");
  kafka.make_request("create_new_property", data, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Addition Successfull");
      res.status(200).json({
        success: true,
        property: results
      });
    }
  });

});

router.get("/getAllPropertiesOfUser", (req, res, next) => {
  console.log("Inside API Request: /getAllPropertiesOfUser");
  let body = {
    email: req.query.email
  };
  console.log("Making Request To Kafka...");
  kafka.make_request("get_user_property", body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        properties: results
      });
    }
  });
});

router.get("/getProperty", (req, res, next) => {
  console.log("Inside API Request: /getProperty");
  console.log("Making Request To Kafka...");
  let body = {
    pid: req.query.pid
  };
  kafka.make_request("get_property", body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        property: results
      });
    }
  });
});

router.get("/getAllPropertiesWhere", (req, res, next) => {
  console.log("Inside API Request: /getAllPropertiesWhere");
  console.log("Making Request To Kafka...");

  var body = {
    where: req.query.where,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
    people: req.query.people
  };
  kafka.make_request("get_properties_where", body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        filteredProperties: results
      });
    }
  });
});

router.post("/createNewBooking", (req, res, next) => {
  console.log("Inside API Request: /createNewBooking");
  console.log("Making Request To Kafka...");
  kafka.make_request("create_new_booking", req.body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        booking: results
      });
    }
  });
});

module.exports = router;
