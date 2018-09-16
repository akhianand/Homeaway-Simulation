import React, { Component } from "react";
import LandingNav from "../../Modules/Navbar/LandingNav";
import LandingHeader from "../../Modules/Headers/LandingHeader";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <LandingNav />
        <LandingHeader />
      </div>
    );
  }
}

export default LandingPage;
