import React, { Component } from "react";
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';


class LandingPage extends Component {

  

  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top"
          id="mainNav"
        >
          <a className="navbar-brand" href="#page-top">
            <img
              src={"./img/HomeAway_Logo.svg"}
              className="img-fluid"
              alt="Responsive image"
            />
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
                <a className="nav-link " href="#projects">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="#signup">
                  List Your Property
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <header className="masthead">
          <div className="  d-flex  h-100 align-items-center">
            <div className="mx-auto text-left " >
           
            <h1 className="increaseWidth">Book beach houses, cabins,</h1>
              <h1 className="increaseWidth">condos and more, worldwide</h1>
              <div className="card mastcard increaseWidth" >
                <div className="card-body mastcardContent " >
                 <div className="row">
                  <div className="col-6 "><input className="form-control form-control-lg" type="text" placeholder="Where do you want to go?"/> </div>
                    <div className="col-3">
                    <InfiniteCalendar
                        width={400}
                        height={600}
                       
                        disabledDays={[0,6]}
                        
                      />
                    </div>
           


            </div>
             
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default LandingPage;
