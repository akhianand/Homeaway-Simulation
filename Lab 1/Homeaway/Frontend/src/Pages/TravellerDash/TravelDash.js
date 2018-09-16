import React, { Component } from "react";
import "react-dates/initialize";
import Profile from "../../Modules/Headers/ProfileHeader"
class TravelDash extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleCheck = this.handleCheck.bind(this);

    this.state = {
      one: "",
      two: "",
      three: ""
    };
  }

  handleCheck(event) {
    if (event.currentTarget.dataset.id === "1") {
      this.setState({
        one: "one",
        two: "",
        three: ""
      });
    } else if (event.currentTarget.dataset.id === "2") {
      this.setState({
        one: "",
        two: "two",
        three: ""
      });
    } else if (event.currentTarget.dataset.id === "3") {
      this.setState({
        one: "",
        two: "",
        three: "three"
      });
    }
    console.log(event.currentTarget.dataset.id);
  }

  render() {
    return (
      <div>
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
              class={this.state.three}
            >
              <a>Account</a>
            </li>
            <hr className="bar" />
          </ul>
        </div>

      <Profile/>
      </div>




    );
  }
}

export default TravelDash;
