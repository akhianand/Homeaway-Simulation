import React, { Component } from "react";
import "react-dates/initialize";
import cookie from 'react-cookies';
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class OtherNav extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          LoginClicked: false,
          OwnerLoginClicked: false,
        };
      }

    onLogoutClickedListener=()=>{
        cookie.remove('email');
    }

    
  render() {
      let redirectVar=null
        if(this.state.OwnerLoginClicked){
        redirectVar = <Redirect to= "/OwnerLogin"/>
        }

    return (
      <nav
        className="navbar  navbar-expand-lg navbar-light fixed-top   bg-white "
        id="loginNav"
        style={{ background: "#ffffff" }}
      >
      {redirectVar}
        <a className="navbar-brand" href="/">
          <img
            src={"./img/HomeAway_LogoBlue.svg"}
            className="img-fluid"
            alt=""
          />
        </a>
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
      </li>
        <li className="nav-item dropdown">
        
        <a
          className="nav-link dropdown-toggle "
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          href=""
        >
          Logout
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a
            href=""
            onClick={this.onLogoutClickedListener}
            className="nav-link dropdown-item"
            style={{ color: "black" }}
          >
            Logout
          </a>
        </div>
      </li>
          <li className="nav-item">
          <br/>
          <Link to="/OwnerLogin">
                <button className="roundcornerbutton WhiteButtonTextBlue  navButtonCursor">
                  List Your Property
                </button>
              </Link>
          </li>

          <li className="nav-item">
        
            <a className="navbar-brand navButtonCursor smallNegetiveMarginUp">
              <img src={"./img/logoblue.svg"} className="img-fluid" alt="" />
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default OtherNav;

