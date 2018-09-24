import React, { Component } from "react";
import "react-dates/initialize";
import Properties from "../../Modules/Headers/PropertiesHeader";
import { Redirect } from "react-router";
import AccountHeader from "../../Modules/Headers/AccountHeader";
import cookie from 'react-cookies';

class OwnerDash extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleCheck = this.handleCheck.bind(this);

    this.state = {
      one: "",
      two: "",
      three: "",
      showProperties: true,
      showBookings: false,
    };
  }





  handleCheck(event) {
    if (event.currentTarget.dataset.id === "1") {
      this.setState({
        one: "one",
        two: "",
        three: "",
        showProperties: true,
        showBookings: false,
      });
    } else if (event.currentTarget.dataset.id === "2") {
      this.setState({
        one: "",
        two: "two",
        three: "",
        showProperties: false,
        showBookings: true,
      });
    
  }
}

  render() {

   

    let redirectVar = null;
    if(!cookie.load('cookie')){
      redirectVar = <Redirect to= "/OwnerLogin"/>
  }
    return (
      <div>
        {redirectVar}
        <nav
          className="navbar  navbar-light fixed-top  p-3 mb-5 bg-white"
          id="dashNav"
          style={{ background: "#ffffff" }}
        >
          <a className="navbar-brand" href="/LandingPage">
            <img
              src={"./img/HomeAway_LogoBlue.svg"}
              className="img-fluid"
              alt=""
            />
          </a>
        </nav>
        <br />
        <br />
        <br />

        <div id="tabsList" className="shadow-sm bg-white">
          <br />
          <hr />
          <ul>
            <li
              onClick={this.handleCheck.bind(this)}
              data-id="1"
              className={this.state.one}
            >
              <a>Properties</a>
            </li>
            <li
              onClick={this.handleCheck.bind(this)}
              data-id="2"
              className={this.state.two}
            >
              <a>Bookings</a>
            </li>
           
            <hr className="bar" />
          </ul>
        </div>
        {this.state.showProperties ? <Properties /> : null}
        {this.state.showAccount ? <AccountHeader /> : null}

      </div>
    );
  }
}

export default OwnerDash;
