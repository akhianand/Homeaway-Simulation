import React, { Component } from "react";

class AddressForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      adl1: "",
      adl2: "",
      city: "",
      state: "",
      zip: 0
    };

    this.addressLine1ChangeHandler = this.addressLine1ChangeHandler.bind(this);
    this.addressLine2ChangeHandler = this.addressLine2ChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.zipChangeHandler = this.zipChangeHandler.bind(this);
  }

  addressLine1ChangeHandler = e => {
    this.setState({
      ad1: e.target.value
    });
  };

  addressLine2ChangeHandler = e => {
    this.setState({
      ad2: e.target.value
    });
  };

  cityChangeHandler = e => {
    this.setState({
      city: e.target.value
    });
  };

  stateChangeHandler = e => {
    this.setState({
      state: e.target.value
    });
  };

  zipChangeHandler = e => {
      let zipval =e.target.value;
    if (e.target.value > 10) {
        zipval = zipval.slice(0, 10);
    }
    this.setState({
      zip: zipval
    });
  };

 

  render() {
    return (
      <div className="col-9">
        <div class="card sharpEdges shadow-lg">
          <div class="card-body">
            <h5 class="card-title">Verify the Location</h5>
            <hr />
            <p class="card-text">
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="row">
                <div className="col-12  ">
                  <div class="form-group">
                    <label for="inputAddress">Address</label>
                    <input
                      type="text"
                      value={this.state.adl1}
                      onChange={this.addressLine1ChangeHandler}
                      class="form-control"
                      id="inputAddress"
                      placeholder="1234 Main St"
                      maxlength="40"
                    />
                  </div>
                  <div class="form-group">
                    <label for="inputAddress2">Address 2</label>
                    <input
                      type="text"
                      value={this.state.adl2}
                      onChange={this.addressLine2ChangeHandler}
                      class="form-control"
                      id="inputAddress2"
                      placeholder="Apartment, studio, or floor"
                      maxlength="20"
                    />
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputCity">City</label>
                      <input
                        type="text"
                        class="form-control"
                        value={this.state.city}
                        onChange={this.cityChangeHandler}
                        placeholder="San Jose"
                        id="inputCity"
                        maxlength="20"
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label for="inputState">State/Province</label>
                      <input
                        type="text"
                        value={this.state.state}
                        onChange={this.stateChangeHandler}
                        class="form-control"
                        id="inputState"
                        placeholder="California"
                        maxlength="20"
                      />
                    </div>
                    <div class="form-group col-md-2">
                      <label for="inputZip">Zip</label>
                      <input
                        type="number"
                        value={this.state.zip}
                        onChange={this.zipChangeHandler}
                        class="form-control"
                        id="inputZip"
                        maxlength="10"
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <span className="text-danger">
                    Hit Next to Save your progress
                  </span>
                  <hr />
                </div>
              </div>

              <div className="row">
                <div className="col-2 offset-2">
             
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

export default AddressForm;
