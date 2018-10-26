const express = require("express");
var multer = require("multer");
var mkdirp = require("mkdirp");
const router = express.Router();
const PropertyModel = require("../model/propertymodel");
const BookingModel = require("../model/bookingmodel");

var moment = require("moment");
moment.suppressDeprecationWarnings = true;

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
  const addressline1 = req.body.addressline1;
  const addressline2 = req.body.addressline2;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const country = req.body.country;
  const phone = req.body.phone;
  const headline = req.body.headline;
  const description = req.body.description;
  const placetype = req.body.placetype;
  const bedrooms = req.body.bedrooms;
  const bathrooms = req.body.bathrooms;
  const accomodates = req.body.accomodates;
  const currency = req.body.currency;
  const baserent = req.body.nightlybaserent;
  const minimumstay = req.body.minimumstay;
  const availablefrom = req.body.startDate;
  const availableto = req.body.endDate;
  const email = req.body.email;
  let filenamearray = [];
  req.files.forEach(file => {
    filenamearray.push(file.filename);
  });

  const photos = filenamearray;

  const property = PropertyModel.create({
    addressline1,
    addressline2,
    city,
    state,
    zip,
    country,
    phone,
    headline,
    description,
    placetype,
    bedrooms,
    bathrooms,
    accomodates,
    currency,
    baserent,
    minimumstay,
    availablefrom,
    availableto,
    photos,
    email
  })
    .then(() => {
      res.status(200).json({
        success: true,
        property
      });
    })
    .catch(err => {
      console.log(err);

      res.status(400).json({
        success: false,
        err
      });
    });
});

router.get("/getAllPropertiesOfUser", (req, res, next) => {
  let email = req.query.email;
  PropertyModel.find({ email: email }).then(
    properties => {
      res.status(200).json({
        success: true,
        properties
      });
    },
    err => {
      res.status(400).json({
        success: false,
        err
      });
    }
  );
});

router.get("/getProperty", (req, res, next) => {
  let id = req.query.pid;
  PropertyModel.findOne({ _id: id }).then(
    property => {
      res.status(200).json({
        success: true,
        property
      });
    },
    err => {
      res.status(400).json({
        success: false,
        err
      });
    }
  );
});

function findIntersections(a, b) {
  let temp;
  if (b.length > a.length) (temp = b), (b = a), (a = temp);
  return a.filter(function(e) {
    return b.indexOf(e) > -1;
  });
}

getDates = function(startDate, endDate) {
  var dates = [],
    currentDate = startDate,
    addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

var isPropertyAvailable = (property, startDate, endDate) => {
  return new Promise(function(resolve, reject) {
    let busydays = [];
    let requireddays = [];
    let bookings = property.bookings;

    bookings.forEach(booking => {
      let dates = getDates(booking.bookingfrom, booking.bookingto);
      dates.forEach(date => {
        busydays.push(moment(date).format('YYYY-MM-DD'));
      });
    });

    let rdates = getDates(startDate, endDate);
    rdates.forEach(rdate => {
      requireddays.push(moment(rdate).format('YYYY-MM-DD'));
    });

  console.log("Dates: ", busydays);
  console.log("Rdates: ", requireddays);

    let intersection = findIntersections(requireddays, busydays);
    console.log("Intersection: ",intersection);
    if (intersection.length > 0) {
      resolve(intersection.length);
    } else {
      resolve(0);
    }
  });
};

var filterProperties = (properties, startDate, endDate) => {
  return new Promise(function(resolve, reject) {
    let newProperties = [];
    try {
      properties.forEach(property => {
        isPropertyAvailable(property, startDate, endDate)
          .then(go => {

            if(go>0){
              console.log("Rejected: ", property._id);

            }else{
              newProperties.push(property);

            }

          });
          
      });
      resolve(newProperties);
    } catch(e) {
      reject("Something went Wrong");
    }
  });
};

router.get("/getAllPropertiesWhere", (req, res, next) => {
  var startDate = moment(req.query.startDate, "MM/DD/YYYY").toDate();
  var endDate = moment(req.query.endDate, "MM/DD/YYYY").toDate();
  console.log("Get All Properties Where: ");
  console.log("Location: ", req.query.where);
  console.log("StartDate: ", startDate);
  console.log("endDate: ", endDate);
  console.log("No.of People: ", req.query.people);
  PropertyModel.find({
    availablefrom: {
      $lte: startDate
    },
    availableto: {
      $gte: endDate
    },
    $or: [
      { city: { $regex: req.query.where, $options: "i" } },
      { state: { $regex: req.query.where, $options: "i" } },
      { country: { $regex: req.query.where, $options: "i" } }
    ],
    accomodates: {
      $gte: req.query.people
    }
  }).then(
    properties => {
      filterProperties(properties, startDate, endDate)
        .then(filteredProperties => {
          console.log("Filtered Properties: " ,filteredProperties.length);
          res.status(200).json({
            success: true,
            filteredProperties
          });
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({
            success: false,
            err
          });
        });
    },
    err => {
      console.log(err);
      res.status(400).json({
        success: false,
        err
      });
    }
  );
});

router.post("/createNewBooking", (req, res, next) => {
  const bookingfrom = req.body.bookingfrom;
  const bookingto = req.body.bookingto;
  const travelleremail = req.body.travelleremail;
  const propertyowneremail = req.body.propertyowneremail;
  const propertyid = req.body.propertyid;
  const nights = req.body.nights;
  const cost = req.body.cost;
  const booking = BookingModel.create({
    bookingfrom,
    bookingto,
    travelleremail,
    propertyowneremail,
    propertyid,
    nights,
    cost
  })
    .then(book => {
      var newBooking = {
        bid: book._id,
        bookingfrom: bookingfrom,
        bookingto: bookingto
      };

      PropertyModel.findOneAndUpdate(
        { _id: propertyid },
        {
          $push: {
            bookings: newBooking
          }
        },
        (err, doc) => {
          if (err) {
            console.log(err);
            res.status(400).json({
              success: false,
              err
            });
          } else {
            console.log(doc);
            res.status(200).json({
              success: true,
              booking
            });
          }
        }
      );
    })
    .catch(err => {
      console.log(err);

      res.status(400).json({
        success: false,
        err
      });
    });
});

module.exports = router;
