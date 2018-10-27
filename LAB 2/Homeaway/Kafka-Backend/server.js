var connection = new require("./kafka/Connection");
var getUserProperties = require("./services/getUserProperties");
var getProperty = require("./services/getProperty");
var getPropertiesWhere = require("./services/getPropertiesWhere");
var createNewBooking = require("./services/createNewBooking");
var createNewProperty = require("./services/createNewProperty");

const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

//Database Connection
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/Homeaway",
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(
    () => {
      console.log("\nSucessfully Connected to MogoDB\n");
    },
    err => {
      console.log("Error Connecting to MogoDB");
    }
  );

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("Topic Request Handler latched to >> ", topic_name);
  consumer.on("message", function(message) {
    console.log("\n\nMessage received for >> " + topic_name);
    var data = JSON.parse(message.value);
    fname.handle_request(data.data, function(err, res) {
      console.log("Request has been handled by Kafka Server, Response is being Forwarded");
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("get_user_property", getUserProperties);
handleTopicRequest("get_property", getProperty);
handleTopicRequest("get_properties_where", getPropertiesWhere);
handleTopicRequest("create_new_booking", createNewBooking);
handleTopicRequest("create_new_property", createNewProperty);
