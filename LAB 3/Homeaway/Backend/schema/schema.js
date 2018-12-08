const graphql = require("graphql");
const UserModel = require("../model/usermodel");
const BookingModel = require("../model/bookingmodel");
const PropertyModel = require("../model/propertymodel");
const moment = require("moment");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    fname: { type: GraphQLString },
    lname: { type: GraphQLString },
    aboutme: { type: GraphQLString },
    city: { type: GraphQLString },
    school: { type: GraphQLString },
    hometown: { type: GraphQLString },
    languages: { type: GraphQLString },
    gender: { type: GraphQLString },
    phone: { type: GraphQLString },
    _id: { type: GraphQLString }
  })
});

const BookingType = new GraphQLObjectType({
  name: "Booking",
  fields: () => ({
    bookingfrom: { type: GraphQLString },
    bookingto: { type: GraphQLString },
    travelleremail: { type: GraphQLString },
    propertyowneremail: { type: GraphQLString },
    propertyid: { type: GraphQLString },
    nights: { type: GraphQLInt },
    cost: { type: GraphQLString },
    city: { type: GraphQLString },
    currency: { type: GraphQLString },
    propertyname: { type: GraphQLString },
    _id: { type: GraphQLString }
  })
});

const PropertyType = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    addressline1: { type: GraphQLString },
    addressline2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLInt },
    country: { type: GraphQLString },
    phone: { type: GraphQLFloat },
    headline: { type: GraphQLString },
    description: { type: GraphQLString },
    placetype: { type: GraphQLString },
    bedrooms: { type: GraphQLInt },
    bathrooms: { type: GraphQLInt },
    accomodates: { type: GraphQLInt },
    currency: { type: GraphQLString },
    baserent: { type: GraphQLInt },
    minimumstay: { type: GraphQLInt },
    availablefrom: { type: GraphQLString },
    availableto: { type: GraphQLString },
    email: { type: GraphQLString },
    _id: { type: GraphQLString },
    bookings: {
      type: new GraphQLList(BookingType),
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          BookingModel.find({ propertyid: parent._id }).then(bookings => {
            resolve(bookings);
          });
        });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        console.log(args.email);
        return new Promise((resolve, reject) => {
          UserModel.findOne({ email: args.email }).then(user => {
            resolve(user);
          });
        });
      }
    },
    property: {
      type: PropertyType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          PropertyModel.findOne({ _id: args.id }).then(property => {
            resolve(property);
          });
        });
      }
    },
    properties: {
      type: new GraphQLList(PropertyType),
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          PropertyModel.find({}).then(properties => {
            resolve(properties);
          });
        });
      }
    },
    propertiesWhere: {
      type: new GraphQLList(PropertyType),
      args: {
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        where: { type: GraphQLString },
        people: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          var startDate = moment(args.startDate, "MM/DD/YYYY").toDate();
          var endDate = moment(args.endDate, "MM/DD/YYYY").toDate();
          var where = args.where;
          var people = args.people;

          console.log(startDate);
          console.log(endDate);

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
            resolve(properties);
          });
        });
      }
    },
    propertiesOfOwner: {
      type: new GraphQLList(PropertyType),
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          PropertyModel.find({ email: args.email }).then(properties => {
            resolve(properties);
          });
        });
      }
    },
    travellerBookings: {
      type: new GraphQLList(BookingType),
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {

        return new Promise((resolve, reject) => {
          BookingModel.find({ travelleremail: args.email }).then(bookings => {
            resolve(bookings);
          });
        });
      }
    },
    ownerBookings: {
      type: new GraphQLList(BookingType),
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          BookingModel.find({ propertyowneremail: args.email }).then(
            bookings => {
              resolve(bookings);
            }
          );
        });
      }
    },
    booking: {
      type: new GraphQLList(BookingType),
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          BookingModel.find({ _id: args.id }).then(booking => {
            resolve(booking);
          });
        });
      }
    }
  }
});


  console.log("Inside API Request: /createNewBooking");





const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      addBooking: {
          type: BookingType,
          args: {
              bookingfrom: { type: GraphQLString },
              bookingto: { type: GraphQLString },
              travelleremail: { type: GraphQLString },
              propertyowneremail: { type: GraphQLString },
              propertyid: { type: GraphQLString },
              nights: { type: GraphQLInt },
              cost: { type: GraphQLString },
              city: { type: GraphQLString },
              currency: { type: GraphQLString },
              propertyname: { type: GraphQLString }
          },
          resolve(parent, args){
            return new Promise((resolve, reject) => {
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
                  resolve(book)
                });
            });
          }
      }
  }
});



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:Mutation
});
