import React, { Component } from "react";
import "react-dates/initialize";
import Tabs from "../../Components/TabList";
import InternalNavOwner from "../Modules/Navbar/InternalNavOwner";
import PropertiesHeader from "../Modules/Headers/PropertiesHeader";
import OwnerBookingsHeader from "../Modules/Headers/OwnerBookingsHeader";


class OwnerDashboardPage extends Component {
  render() {
    let tabOne = <PropertiesHeader />;
    let tabTwo = <OwnerBookingsHeader />;

    return (
      <div>
        <InternalNavOwner/>
        <Tabs
          oneTab={tabOne}
          twoTab={tabTwo}
          oneTabName={"Properties"}
          twoTabName={"Bookings"}
        />
      </div>
    );
  }
}

export default OwnerDashboardPage;
