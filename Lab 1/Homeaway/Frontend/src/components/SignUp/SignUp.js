import React, { Component } from "react";
import "react-dates/initialize";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm p-3 mb-5 bg-white"
          id="loginNav"
          style={{ background: "#ffffff" }}
        >
          <div className="container">
            <a className="navbar-brand" href="#page-top">
              <img
                src={"./img/HomeAway_LogoBlue.svg"}
                className="img-fluid"
                alt="Responsive image"
              />
            </a>
          </div>
        </nav>

        <header className="loginbg">
          <div className=" increaseHeight d-flex ">
            <div className="mx-auto text-center">
              <h1 className="roboFontLight">Log in to Homeaway</h1>
              <br />
              <h5 className="roboFontLight">
                Need an Account? <a href="/signup">Sign Up</a>
              </h5>
              <br />

              <div className="card text-left somePadding">
                <h4 className="roboFontLight"> Account Login</h4>
                <hr />
                <form>
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
                    Submit
                  </button>
                  <br />
                  <br />
                  <div className="form-check ">
                    <input
                      type="checkbox"
                      className="form-check-input sharpEdges"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" for="exampleCheck1">
                      Keep me signed in
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Login;
