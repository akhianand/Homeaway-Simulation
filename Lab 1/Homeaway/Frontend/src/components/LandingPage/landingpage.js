import React, { Component } from 'react';

class LandingPage extends Component {
  render() {
    return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <a className="navbar-brand" href="#page-top"><img src= {"./img/HomeAway_Logo.svg"} className="img-fluid" alt="Responsive image"/></a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link " href="#about">Trip Boards</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#projects">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#signup">List Your Property</a>
            </li>
          </ul>
        </div>
    </nav>

    <header className="masthead">
      <div className="  d-flex  h-100 align-items-center">
          <div className="mx-auto text-left">
          <h1>Book beach houses, cabins,</h1>
          <h1>condos and more, worldwide</h1>     
        </div>
         </div>
    </header>
    </div>
    );
  }
}

export default LandingPage;
