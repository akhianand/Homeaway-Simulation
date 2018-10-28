import React, { Component } from "react";
import "react-dates/initialize";
import Tabs from "../../Components/TabList";
import InternalNavOwner from "../Modules/Navbar/InternalNavOwner";
import PropertiesHeader from "../Modules/Headers/PropertiesHeader";
import OwnerBookingsHeader from "../Modules/Headers/OwnerBookingsHeader";
import OwnerMessagingHeader from "../Modules/Headers/OwnerMessagingHeader";

class OwnerDashboardPage extends Component {
  render() {
    let tabOne = <OwnerMessagingHeader />;
    let tabTwo = <PropertiesHeader />;
    let tabThree = <OwnerBookingsHeader />;

    return (
      <div>
        <InternalNavOwner />

        <Tabs
          oneTab={tabOne}
          twoTab={tabTwo}
          threeTab={tabThree}
          oneTabName={"Messages"}
          twoTabName={"Properties"}
          threeTabName={"Bookings"}
        />
      </div>
    );
  }
}

export default OwnerDashboardPage;
