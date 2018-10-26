import React, { Component } from "react";
import "react-dates/initialize";

import moment from "moment";
import { withRouter, Link } from "react-router-dom";

class BookingsHeader extends Component {
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

  componentDidMount() {
    // const data = {
    //     email: cookie.load("email"),
    // };
    // axios.defaults.withCredentials = true;
    // axios.post('http://localhost:8000/getAllTripsOfUser',data)
    //         .then((response) => {
    //           if(response.status===200){
    //            if(response.data.success){
    //              this.setState({
    //                properties: response.data.rows
    //             })
    //            }
    //           }
    //     });
  }

  onViewPropertyClickHandler = e => {
    console.log(e.currentTarget.value);
    //   this.setState({
    //     propertyClicked: true,
    //     propertypid:pid
    //  });
  };
  getFormattedDate(dt) {
    let date = dt.toDate();
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  render() {
    let properties = null;
    if (this.state.properties.length === 0) {
      properties = (
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
      properties = this.state.properties.map(property => {
        return (
          <div className="col-12">
            <div className="card shadow-lg">
              <h5 className="card-header">Booking Reference: {property.bid}</h5>
              <div className="card-body">
                <h5 className="card-title">
                  {this.getFormattedDate(moment(property.from))} to{" "}
                  {this.getFormattedDate(moment(property.to))}{" "}
                </h5>
                <p className="card-text">
                  Homeaway @ <b>{property.city}</b>
                </p>
                <p className="card-text">
                  Expense{" "}
                  <b>
                    {property.cost}
                    {property.currency}
                  </b>
                </p>
                <a
                  onClick={() =>
                    this.setState({
                      propertypid: property.pid,
                      bookingFrom: property.from,
                      bookingTo: property.to,
                      propertyClicked: true
                    })
                  }
                  className="btn btn-primary text-white">
                  View Booking
                </a>
              </div>
            </div>
            <br />
            <br />
          </div>
        );
      });
    }

    let redirectVar = null;
    if (this.state.propertyClicked) {
      redirectVar = this.props.history.push({
        pathname: "/PropertyView",
        state: {
          pid: this.state.propertypid,
          callfrom: "BookedCustomer",
          startDate: this.state.bookingFrom,
          endDate: this.state.bookingTo
        }
      });
    }

    return (
      <div className="container">
        <div className="row">
          {redirectVar}
          {properties}
        </div>
      </div>
    );
  }
}

export default withRouter(BookingsHeader);
