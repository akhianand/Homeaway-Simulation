import React, { Component } from "react";
import LoginNav from "../../Modules/Navbar/LoginNav"; 
import LoginHeader from "../../Modules/Headers/LoginHeader";


class Login extends Component {
  render() {
    return (
      <div>
      
      <LoginNav/>
      <LoginHeader isOwner={false} isTraveller={true}/>

      </div>
      
    );
  }
}

export default Login;
