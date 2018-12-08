const express = require("express");
const router = express.Router();
const UserModel = require("../model/usermodel");
const BookingModel = require("../model/bookingmodel");
const PropertyModel = require("../model/propertymodel");


router.get("/getAllPropertiesOfUser", (req, res, next) => {
  console.log("Inside API Request: /getAllPropertiesOfUser");
  PropertyModel.find({ email: req.query.email }).then(
    properties => {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        properties
      });
    },
    err => {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    }
  );
});

router.get("/getProperty", (req, res, next) => {
  console.log("Inside API Request: /getProperty");
  PropertyModel.findOne({ _id: req.query.pid }).then(
    property => {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        property
      });
    },
    err => {
      console.log("Fetch Error");
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
        busydays.push(moment(date).format("YYYY-MM-DD"));
      });
    });

    let rdates = getDates(startDate, endDate);
    rdates.forEach(rdate => {
      requireddays.push(moment(rdate).format("YYYY-MM-DD"));
    });

    let intersection = findIntersections(requireddays, busydays);
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
        isPropertyAvailable(property, startDate, endDate).then(go => {
          if (go > 0) {
          } else {
            newProperties.push(property);
          }
        });
      });
      resolve(newProperties);
    } catch (e) {
      reject("Something Went Wrong");
    }
  });
};



router.get("/getAllPropertiesWhere", (req, res, next) => {
  console.log("Inside API Request: /getAllPropertiesWhere");
  var startDate = moment(req.query.startDate, "MM/DD/YYYY").toDate();
  var endDate = moment(req.query.endDate, "MM/DD/YYYY").toDate();
  var where = req.query.where;
  var people = req.query.people;
  let data = {
    startDate,
    endDate,
    where,
    people
  };
  PropertyModel.find({
    availablefrom: {
      $lte: startDate
    },
    availableto: {
      $gte: endDate
    },
    $or: [
      { city: { $regex: where, $options: "i" } },
      { state: { $regex: where, $options: "i" } },
      { country: { $regex: where, $options: "i" } }
    ],
    accomodates: {
      $gte: people
    }
  }).then(properties => {
    filterProperties(properties, startDate, endDate)
      .then(filteredProperties => {
        console.log("Fetch Successfull");
        res.status(200).json({
          success: true,
          filteredProperties
        });
      })
      .catch(err => {
        console.log("Fetch Error");
        res.status(400).json({
          success: false,
          err
        });
      });
  });
});

router.post("/createNewBooking", (req, res, next) => {
  console.log("Inside API Request: /createNewBooking");
  const booking = BookingModel.create({
    bookingfrom: req.body.bookingfrom,
    bookingto: req.body.bookingto,
    travelleremail: req.body.travelleremail,
    propertyowneremail: req.body.propertyowneremail,
    propertyid: req.body.propertyid,
    nights: req.body.nights,
    cost: req.body.cost,
    currency: req.body.currency,
    city: req.body.city,
    propertyname: req.body.propertyname
  })
    .then(book => {
      var newBooking = {
        bid: book._id,
        bookingfrom: req.body.bookingfrom,
        bookingto: req.body.bookingto
      };
      PropertyModel.findOneAndUpdate(
        { _id: req.body.propertyid },
        {
          $push: {
            bookings: newBooking
          }
        },
        (err, doc) => {
          if (err) {
            console.log(err);
            console.log("Addition Failure:\n", err);
            res.status(400).json({
              success: false,
              err
            });
          } else {
            console.log("Sucessfully Added Booking\n");
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

router.get("/getTravellerBookings", (req, res, next) => {
  console.log("Inside API Request: /getTravellerBookings");

  let email = req.query.email;
  BookingModel.find({ travelleremail: email })
    .then(bookings => {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        bookings
      });
    })
    .catch(err => {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    });
});

router.get("/getOwnerBookings", (req, res, next) => {
  console.log("Inside API Request: /getOwnerBookings");
  let email = req.query.email;
  BookingModel.find({ propertyowneremail: email })
    .then(bookings => {
      res.status(200).json({
        success: true,
        bookings
      });
    })
    .catch(err => {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    });
});

router.get("/getBooking", (req, res, next) => {
  console.log("Inside API Request: /getBooking");
  let bid = req.query.bid;
  BookingModel.findOne({ _id: bid })
    .then(booking => {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        booking
      });
    })
    .catch(err => {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    });
});

router.get("/getUserInformation", (req, res, next) => {
  console.log("Inside API Request: /getUserInformation");
  UserModel.findOne({ email: req.query.email }).then(
    user => {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        user
      });
    },
    err => {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    }
  );
});

router.post("/setUserInformation", (req, res, next) => {
  console.log("Inside API Request: /setUserInformation");
  UserModel.findOneAndUpdate(
    { email: msg.email },
    {
      fname: msg.fname,
      lname: msg.lname,
      aboutme: msg.aboutme,
      city: msg.city,
      school: msg.school,
      hometown: msg.hometown,
      languages: msg.languages,
      gender: msg.gender,
      phone: msg.phone
    }
  ).then(
    user => {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        user
      });
    },
    err => {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    }
  );
});

module.exports = router;
