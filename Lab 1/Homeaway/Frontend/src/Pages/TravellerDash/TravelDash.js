import React, { Component } from "react";
import "react-dates/initialize";
import Profile from "../../Modules/Headers/ProfileHeader";
import cookie from 'react-cookies';
import { Redirect } from "react-router";

class TravelDash extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleCheck = this.handleCheck.bind(this);

    this.state = {
      one: "",
      two: "",
      three: "",
      showProfile: false,
      showAccount: false,
      showMyTrips: true
    };
  }

  handleCheck(event) {
    if (event.currentTarget.dataset.id === "1") {
      this.setState({
        one: "one",
        two: "",
        three: "",
        showProfile: false,
        showAccount: false,
        showMyTrips: true
      });
    } else if (event.currentTarget.dataset.id === "2") {
      this.setState({
        one: "",
        two: "two",
        three: "",
        showProfile: true,
        showAccount: false,
        showMyTrips: false
      });
    } else if (event.currentTarget.dataset.id === "3") {
      this.setState({
        one: "",
        two: "",
        three: "three",
        showProfile: false,
        showAccount: true,
        showMyTrips: false
      });
    }
    console.log(event.currentTarget.dataset.id);
  }

  render() {
    let redirectVar = null;
    if(!cookie.load('cookie')){
      redirectVar = <Redirect to= "/Login"/>
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
              <a>MyTrips</a>
            </li>
            <li
              onClick={this.handleCheck.bind(this)}
              data-id="2"
              className={this.state.two}
            >
              <a>Profile</a>
            </li>
            <li
              onClick={this.handleCheck.bind(this)}
              data-id="3"
              className={this.state.three}
            >
              <a>Account</a>
            </li>
            <hr className="bar" />
          </ul>
        </div>
        {this.state.showProfile ? <Profile /> : "Website Under Construction"}
      </div>
    );
  }
}

export default TravelDash;
