import React, { Component } from "react";
import "react-dates/initialize";
import SearchNav from "../Modules/Navbar/SearchNav";
import PropertyDetailsDisplayHeader from "../Modules/Headers/PropertyDetailsDisplayHeader";
import PropertyBookingPanel from "../../Components/PropertyViewPanels/BookingPanel";
import PropertyBookedPanel from "../../Components/PropertyViewPanels/ViewBookingPanel";
import OwnerPropertyPanel from "../../Components/PropertyViewPanels/OwnerViewProperty";
import OwnerBookingPanel from "../../Components/PropertyViewPanels/OwnerViewBookings";

class PropertyViewPage extends Component {
  componentWillMount() {
    console.log(this.props.location.state.pid);
  }

  render() {
    //Sidepanel Changes Based on Weather its Travellere or Owner of Said Property
    let sidepanel = null;
    if (this.props.location.state.callfrom === "Customer") {
      sidepanel = <PropertyBookingPanel pid={this.props.location.state.pid} />;
    } else if (this.props.location.state.callfrom === "Owner") {
      sidepanel = <OwnerPropertyPanel />;
    } else if (this.props.location.state.callfrom === "BookedCustomer") {
      sidepanel = <PropertyBookedPanel />;
    } else if (this.props.location.state.callfrom === "OwnerBooking") {
      sidepanel = <OwnerBookingPanel />;
    }

    return (
      <div>
                <SearchNav />

        <div className="container">
          <div className="row">
            <div className="col-8">
              <PropertyDetailsDisplayHeader
                pid={this.props.location.state.pid}
              />
            </div>
            <div className="col-4">{sidepanel}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyViewPage;
