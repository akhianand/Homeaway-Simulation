import React, { Component } from "react";
import "react-dates/initialize";

class LoginHeader extends Component {
  render() {
    return (
      <header className="loginbg">
        <div className=" increaseHeight d-flex ">
          <div className="mx-auto text-center">
            <h1 className="roboFontLight">Log in to Homeaway</h1>
            <br />
            <h5 className="roboFontLight">
              Need an Account? <a href="/SignUp">Sign Up</a>
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
                  Log In
                </button>
                <br />
                <br />
                <div className="form-check ">
                  <input
                    type="checkbox"
                    className="form-check-input sharpEdges"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label">Keep me signed in</label>
                </div>
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
    );
  }
}

export default LoginHeader;
