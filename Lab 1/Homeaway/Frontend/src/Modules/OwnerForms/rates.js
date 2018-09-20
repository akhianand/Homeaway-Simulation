import React, { Component } from "react";
import "react-dates/initialize";
import Profile from "../../Modules/Headers/ProfileHeader";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import AccountHeader from "../../Modules/Headers/AccountHeader";

class RatesForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
        currency:"",
        pricepernight:0,
        minimumstay:0

    };
  }

  currencyChangeHandler = e =>{
      this.setState({
          currency:e.target.value
      })
  }

  pricepernightChangeHandler = e => {
    let ppn =e.target.value;
  if (e.target.value > 3) {
    ppn = ppn.slice(0, 3);
  }
  this.setState({
    pricepernight: ppn
  });
};

minstayChangeHandler = e => {
    let ms =e.target.value;
  if (e.target.value > 2) {
      ms = ms.slice(0, 2);
  }
  this.setState({
    minimumstay: ms
  });
};

  render() {
    return (
      <div className="col-9">
        <div class="card sharpEdges shadow-lg">
          <div class="card-body">
            <h5 class="card-title">How much do you want to charge</h5>
            <hr />
            <p class="card-text">
              <br />

              <span>
                We recommend starting with a low price to get a few bookings and
                earn some initial guest reviews. You can update your rates at
                any time.
              </span>
              <br />
              <br />
              <br />
              <hr />
              <br />

              <div className="row">
                <div className="col-6  ">
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">Currency</label>

                    <select class="form-control" id="exampleFormControlSelect1">
                      <option value="" />
                      <option value="AUD">Australian Dollar (AUD)</option>
                      <option value="EUR">Euros (EUR)</option>
                      <option value="GBP">Great British Pound (GBP)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="CAD">Canadian Dollar (CAD)</option>
                      <option value="NZD">New Zealand Dollar (NZD)</option>
                      <option value="BRL">Brazil Real (BRL)</option>
                    </select>
                  </div>
                </div>
              </div>
              <br />

              <hr />
              <div className="row">
                <div className="col-6  ">
                  <div class="form-group">
                    <label for="formGroupExampleInput">Nightly Base Rate</label>
                    <input
                      type="number"
                      value={this.state.pricepernight}
                      onChange={this.pricepernightChangeHandler}
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6  ">
                  <div class="form-group">
                    <label for="formGroupExampleInput">Minimum Stay</label>
                    <input
                      type="number"
                      class="form-control"
                      value={this.state.minimumstay}
                      onChange={this.minstayChangeHandler}
                    />
                  </div>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-2 offset-2">
                  <button
                    type="button"
                    class="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                  >
                    Back
                  </button>
                </div>
                <div className="col-2 offset-4">
                  <button
                    type="button"
                    class="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default RatesForm;
