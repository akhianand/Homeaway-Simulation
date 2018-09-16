import React, { Component } from "react";
import "react-dates/initialize";
import {Link} from 'react-router-dom';

import moment from "moment";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

class LandingPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      date: moment()
    };
  }

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
              <Link to="/Login" className="nav-link " style={{color: 'white'}} >Login</Link>

         
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
            <div className="mx-auto text-left ">
              <h1 className="increaseWidth">Book beach houses, cabins,</h1>
              <h1 className="increaseWidth">condos and more, worldwide</h1>
              <div className="card mastcard increaseWidth">
                <div className="card-body mastcardContent ">
                  <div className="row">
                    <div className="col-6 ">
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Where do you want to go?"
                      />{" "}
                    </div>
                    <div className="col-3">
                      <DateRangePicker
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) =>
                          this.setState({ startDate, endDate })
                        } // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput =>
                          this.setState({ focusedInput })
                        } // PropTypes.func.isRequired,
                      />
                    </div>
                    <div className="col-2">
                      <select class="form-control form-control-lg">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                      </select>
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
