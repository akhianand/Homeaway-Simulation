import React, { Component } from "react";
import "react-dates/initialize";

class SignUpHeader extends Component {
  render() {
    return (
      <div>
        <header className="loginbg">
          <div className=" increaseHeight d-flex ">
            <div className="mx-auto text-center">
              <h1 className="roboFontLight">Sign up for Homeaway</h1>
              <br />
              <h5 className="roboFontLight">
                Already have an account? <a href="/Login">Log in</a>
              </h5>
              <br />

              <div className="card text-left somePadding">
                <form>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group ">
                        <input
                          type="text"
                          className="form-control sharpEdges"
                          id="FirstName"
                          aria-describedby="emailHelp"
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group ">
                        <input
                          type="text"
                          className="form-control sharpEdges"
                          id="LastName"
                          aria-describedby="emailHelp"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group ">
                    <input
                      type="email"
                      className="form-control sharpEdges"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control sharpEdges"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary LoginButton">
                    Sign Me Up
                  </button>
                  <br />
                  <br />
                </form>
              </div>
              <br />
              <br />
              <br />
              <small>
                This is a total and complete ripoff of{" "}
                <a href="https://homeaway.com">Homeaway.com </a>
                <br />
                and is only meant for educational purposes
              </small>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default SignUpHeader;
