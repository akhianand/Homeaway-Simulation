import React, { Component } from "react";
import "react-dates/initialize";
import BookingsHeader from "../Modules/Headers/BookingsHeader";
import Tabs from "../../Components/TabList";
import ProfileHeader from "../Modules/Headers/ProfileHeader";
import InternalNavTraveller from "../Modules/Navbar/InternalNavTraveller";

class TravelDashboardPage extends Component {

  render() {
  let redirectVar = null;
  let tabOne= <BookingsHeader /> ;
  let tabTwo= <ProfileHeader /> ;

    return (
      <div>
        {redirectVar}  
        <InternalNavTraveller/>
        <Tabs
        oneTab={tabOne}
        twoTab={tabTwo}
        oneTabName={"My Trips"}
        twoTabName={"Profile"}
        />
      </div>
    );
  }
}

export default TravelDashboardPage;
