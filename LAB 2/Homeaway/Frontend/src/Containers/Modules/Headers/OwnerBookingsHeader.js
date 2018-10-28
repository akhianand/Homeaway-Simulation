

import React, { Component } from "react";
import "react-dates/initialize";
import { withRouter, Link } from "react-router-dom";
import { getOwnerBookings } from "../../../Actions/bookingActions";
import { checkValidity } from "../../../Actions/userActions";

import { connect } from "react-redux";
import moment from "moment";
class OwnerBookingsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      propertyClicked: false,
      propertypid: "",
      propertybid: 0,
      bookingFrom: null,
      bookingTo: null
    };
  }



  componentWillMount(){
    this.props.checkValidity(() => {
      if (this.props.tokenState.validity) {
        this.props.history.push({
          pathname: "/OwnerLogin"
        });
      }
    });

  }
  componentDidMount() {
    this.props.getOwnerBookings(localStorage.getItem("username")).then(()=>{
      console.log(this.props.ownerBookings.bookings);
    });
  }

  render() {
    let bookings = null;
    if (this.props.ownerBookings.bookings.length === 0) {
      bookings = (
        <div className="col-12 text-center">
          <h2>No Bookings Made</h2>
          <br />
          <br />
          <Link to="/">
            <button type="button" className="btn btn-primary btn-lg ">
              Search Homeaway
            </button>
          </Link>
        </div>
      );
    } else {
      bookings = this.props.ownerBookings.bookings.map(booking => {
        let from = moment(new Date(booking.bookingfrom)).format('MM/DD/YYYY');;
        let to = moment(new Date(booking.bookingto)).format('MM/DD/YYYY');;
        let status= null;
        if(Date.now()> new Date(booking.bookingto)){
          status=<small className="text-danger">This Booking has Elapsed</small>
        }else if(Date.now()>= new Date(booking.bookingfrom)>= new Date(booking.bookingto)){
          status=<small className="text-neutral">This Booking is Ongoing</small>
        }else if(Date.now()< new Date(booking.bookingfrom)){
          status=<small className="text-success">This Booking is Pending</small>


        }
        return (
          <div key={booking._id} className="col-12">
            <br />
            <br />
            <div className="card shadow-lg">
              <h5 className="card-header">Booking Reference: {booking._id}</h5>
              <div className="card-body">
              {status}<br></br>

                <h5 className="card-title">
                  {from}&nbsp;&nbsp;to&nbsp;&nbsp;
                 {to}
                </h5>
                <p className="card-text">
                  Homeaway @ <b>{booking.city}</b>
                </p>
                <p className="card-text">
              <b>{booking.propertyname}</b>
                </p>
                
                <p className="card-text">
                  Income
                  <b>&nbsp;
                    {booking.cost}
                    {booking.currency}
                  </b>
                </p>
             
                <a
                    
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/PropertyView",
                        state: {
                          pid: booking.propertyid,
                          bid:booking._id,
                          callfrom: "OwnerBooking"
                        }
                      });
                    }}
                  className="btn btn-primary text-white">
                  View Booking
                </a>
              </div>
            </div>
          
          </div>
        );
      });
    }


    return (
      <div className="container">
        <div className="row">
          {bookings}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ownerBookings: state.OwnerBookingsReducer,
    tokenState: state.TokenReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getOwnerBookings,checkValidity }
  )(OwnerBookingsHeader)
);
