import React, { Component } from "react";
import { Link } from "react-router-dom";

class LandingNav extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        id="mainNav"
      >
        <a className="navbar-brand" href="#page-top">
          <img src={"./img/HomeAway_Logo.svg"} className="img-fluid" alt="" />{" "}
        </a>

        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars" />
        </button>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link " href="#about">
                Trip Boards
              </a>
            </li>

            <li className="nav-item">
              <Link
                to="/Login"
                className="nav-link "
                style={{ color: "white" }}
              >
                Login
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link " href="#signup">
                List Your Property
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default LandingNav;
