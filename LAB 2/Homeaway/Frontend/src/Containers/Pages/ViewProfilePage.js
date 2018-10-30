import React, { Component } from "react";
import "react-dates/initialize";
import axios from "axios";
import { Redirect } from "react-router";
import cookie from "react-cookies";
//import OtherNav from "../Modules/Navbar/OtherNav";

class ViewProfilePage extends Component {
 
  componentWillMount() {
  }

  render() {
    let redirectVar = null;
    if (!cookie.load("email")) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div>
        {redirectVar}
        {/* <OtherNav /> */}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <div class="card shadow-lg">
                <div class="card-body text-left">
                  <div className="row">
                    <div className="col-4">
                      <img
                        src="https://loremflickr.com/150/150"
                        className="rounded-circle mx-auto d-block shadow-lg"
                        alt="./img/profile.png"
                      />
                    </div>
                    <div className="col-8">
                      <h1 className="fontChange">
                        Hi I'm {this.state.fname}
                        &nbsp;
                        {this.state.lname}!
                      </h1>
                      <h4 className="fontChange">
                        Member Since {this.state.membersince}
                      </h4>
                      <br />
                      <br />

                      <h4>About Me</h4>
                      <p>{this.state.aboutme}</p>
                      <br />
                      <br />
                      <br />
                      <p>
                        <b>Hometown: </b>
                        {this.state.hometown}
                  
                        <br />
                        <b> School:</b> {this.state.school}
                        <br />
                        <b>Languages:</b> {this.state.languages}
                        <br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewProfilePage;
