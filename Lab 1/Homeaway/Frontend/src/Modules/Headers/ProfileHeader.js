import React, { Component } from "react";
import "react-dates/initialize";

class Profile extends Component {
  render() {
    return (
      <div className="container">
        <br />
        <br />
        <div className="row">
          <img
            id="main_img"
            src="https://loremflickr.com/150/150"
            class="rounded-circle mx-auto d-block"
            alt="./img/profile.png"
          />
        </div>
        <div className="row">
          <button class="rounded-circle shadow btn mx-auto d-block">
            <i class="fa fa-edit" />
          </button>
        </div>
        <br />
        <div className="row">
          <h2 class=" mx-auto d-block ">Jon Doeson</h2>
          <br />
        </div>
        <div className="row">
          <span className="mx-auto d-block">
            Member since 2018 <br />
          </span>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-8">
            <div class="card">
              <div class="card-body">
                <b>
                  <h4 class="card-title">Profile Information</h4>
                </b>
                <br />
                <div className="row">
                  <div className="col-6">
                    <input
                      class="form-control form-control-md"
                      type="text"
                      placeholder="First Name"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      class="form-control form-control-md"
                      type="text"
                      placeholder="Last Name"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12  ">
                    <textarea
                      class="form-control form-control-md"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="About Me"
                    />

                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      class="form-control form-control-md"
                      type="text"
                      placeholder="My city, Country"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      class="form-control form-control-md"
                      type="text"
                      placeholder="Company"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      class="form-control form-control-md"
                      type="text"
                      placeholder="School"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      class="form-control form-control-md"
                      type="text"
                      placeholder="Hometown"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      class="form-control form-control-md"
                      type="text"
                      placeholder="Languages"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <select
                      id="inputState"
                      class="form-control form-control-md"
                    >
                      <option selected>Choose...</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      class="form-control form-control-md"
                      type="number"
                      placeholder="Phone Number"
                    />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div class="card">
              <div class="card-body text-center">
                <button
                  type="button"
                  class="viewProfileButton btn btn-primary btn-lg btn-block"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <button type="button" class="roundcornerbutton btn btn-primary btn-lg">
          Save Changes
        </button>
        <br />
        <br /> <br />
        <br />
      </div>
    );
  }
}

export default Profile;
