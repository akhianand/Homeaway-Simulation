import React, { Component } from "react";
import "react-dates/initialize";
import Profile from "../../Modules/Headers/ProfileHeader";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import AddressForm from "../../Modules/OwnerForms/address";
import DescriptionForm from "../../Modules/OwnerForms/description";
import ImagesForm from "../../Modules/OwnerForms/images";
import LoginNav from "../../Modules/Navbar/LoginNav";
import RatesForm from "../../Modules/OwnerForms/rates";
import AvailabilityForm from "../../Modules/OwnerForms/availability";

class OwnerDash extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddressState: false,
      showDescriptionState: false,
      showImagesState: false,
      showPricingList: true,
      showRatesState: false,
      showAvailability: false,

      //-------------------//
      //    Description    //
      //-------------------//

      headline: "",
      description: "",
      placetype: "",
      bedrooms: 0,
      bathrooms: 0,
      accomdates: 0
    };
  }
  //-----------------------------------------------

  //---------------------------//
  //    Description Handlers   //
  //---------------------------//
  headlineChangeHandler = head => {
    this.setState({
      headline: head
    });
  };

  descriptionChangeHandler = des => {
    this.setState({
      description: des
    });
  };

  placetypeChangeHandler = placet => {
    this.setState({
      placetype: placet
    });
  };

  bedroomChangeHandler = beds => {
    this.setState({
      bedrooms: beds
    });
  };

  bathroomChangeHandler = baths => {
    this.setState({
      bathrooms: baths
    });
  };

  accomdatesChangeHandler = acmdts => {
    this.setState({
      accomdates: acmdts
    });
  };

  //-------------------------------------------------

  addressClickHandler = e => {
    this.setState({
      showAddressState: true,
      showDescriptionState: false,
      showImagesState: false,
      showRatesState: false,
      showAvailability: false
    });
  };

  descriptionClickHandler = e => {
    this.setState({
      showAddressState: false,
      showDescriptionState: true,
      showImagesState: false,
      showRatesState: false,
      showAvailability: false
    });
  };

  imageClickHandler = e => {
    this.setState({
      showAddressState: false,
      showDescriptionState: false,
      showImagesState: true,
      showRatesState: false,
      showAvailability: false
    });
  };
  ratesClickHandler = e => {
    this.setState({
      showAddressState: false,
      showDescriptionState: false,
      showImagesState: false,
      showRatesState: true,
      showAvailability: false
    });
  };

  availabilityClickHandler = e => {
    this.setState({
      showAddressState: false,
      showDescriptionState: false,
      showImagesState: false,
      showRatesState: false,
      showAvailability: true
    });
  };

  pricingClickHandler = e => {
    this.setState({
      showPricingList: !this.state.showPricingList
    });
  };

  render() {
    let formshow = <AddressForm />;
    let listshow = null;

    if (this.state.showAddressState) {
      formshow = <AddressForm />;
    } else if (this.state.showDescriptionState) {
      formshow = (
        <DescriptionForm
          onHeadlineChange={this.headlineChangeHandler}
          onDescriptionChange={this.descriptionChangeHandler}
          onPlaceTypeChange={this.placetypeChangeHandler}
          onBedroomChange={this.bedroomChangeHandler}
          onBathroomChange={this.bathroomChangeHandler}
          onAccomodatesChange={this.accomdatesChangeHandler}
          headline= {this.state.headline}
          description= {this.state.description}
          placetype= {this.state.placetype}
          bedrooms = {this.state.bedrooms}
          bathrooms =  {this.state.bathrooms}
          accomdates= {this.state.accomdates}
        />
      );
    } else if (this.state.showImagesState) {
      formshow = <ImagesForm />;
    } else if (this.state.showRatesState) {
      formshow = <RatesForm />;
    } else if (this.state.showAvailability) {
      formshow = <AvailabilityForm />;
    }

    if (this.state.showPricingList) {
      listshow = (
        <div>
          <li onClick={this.availabilityClickHandler}>
            <span className="btn">Availability</span>
          </li>
          <li>
            <span onClick={this.ratesClickHandler} className="btn">
              Rental Rates
            </span>
          </li>
        </div>
      );
    } else {
      listshow = null;
    }
    return (
      <div>
        <LoginNav />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <br />
              <br />
              <br />
              <ul className="OwnerBulletless">
                <li onClick={this.addressClickHandler}>
                  <span class="oi oi-circle-check bulletIncreaseSize " />
                  <span className="btn">Location</span>
                </li>
                <li onClick={this.descriptionClickHandler}>
                  <span class="oi oi-circle-check bulletIncreaseSize " />
                  <span className="btn">Details</span>
                </li>
                <li onClick={this.imageClickHandler}>
                  <span class="oi oi-circle-check bulletIncreaseSize " />
                  <span className="btn">Photos</span>
                </li>
                <li onClick={this.pricingClickHandler}>
                  <span class="oi oi-circle-check bulletIncreaseSize " />
                  <span className="btn">Pricing</span>
                </li>
                {listshow}
              </ul>
            </div>
            {formshow}
          </div>
        </div>
      </div>
    );
  }
}

export default OwnerDash;
