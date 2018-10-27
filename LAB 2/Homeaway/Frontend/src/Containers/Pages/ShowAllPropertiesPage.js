import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import {
  getPropertiesWhere,
  searchParams
} from "../../Actions/propertyActions";
import { connect } from "react-redux";
import { checkValidity } from "../../Actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchNav from "../Modules/Navbar/SearchNav";
moment.suppressDeprecationWarnings = true;

class ShowAllPropertiesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      propertyClicked: false,
      propertypid: ""
    };
  }
  componentDidMount() {
    this.props.checkValidity();
  }
  render() {
    if (this.props.isValidTokenState !== undefined) {
      if (!this.props.isValidTokenState) {
        this.props.history.push({
          pathname: "/Login"
        });
      }
    }
    let properties = this.props.searchProperty.properties.map(property => {
      let ImageUrl = "./uploads/" + property.email + "/" + property.photos[0];

      return (
        <a
          key={property._id}
          onClick={() => {
            this.props.history.push({
              pathname: "/PropertyView",
              state: {
                pid: property._id,
                callfrom: "Customer"
              }
            });
          }}>
          <div>
            <div className="card shadow-lg box  ">
              <div className="row no-gutters">
                <div className="col-auto">
                  <img src={ImageUrl} className="img-fluid resize" alt="" />
                </div>
                <div className="col  text-left" style={{ paddingLeft: "3%" }}>
                  <br />
                  <div className="card-block px-2">
                    <h4 className="card-title">{property.headline}</h4>
                    <p className="card-text">
                      <i>
                        {property.placetype} &nbsp;. &nbsp;
                        {property.bedrooms}
                        &nbsp; Bed&nbsp;.&nbsp;
                        {property.bathrooms}
                        &nbsp;Bath&nbsp;.&nbsp;Sleeps&nbsp;
                        {property.accomodates}
                      </i>
                      <br />
                      <br />
                      <FontAwesomeIcon icon="location-arrow" />
                      &nbsp;
                      {property.city}, {property.state}
                    </p>
                  </div>
                  <br />
                  <br />

                  <div
                    className="card-footer text-muted"
                    style={{
                      marginLeft: "-4.5%",
                      paddingTop: "1.25%",
                      paddingLeft: "5%"
                    }}>
                    <div className="row">
                      <div className="col-auto">
                        <br />
                        <b>
                          <h3 style={{ color: "#000000" }}>
                            ${property.baserent}
                          </h3>
                        </b>
                      </div>
                      <div className="col-3">
                        <br />
                        avg/night
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </a>
      );
    });

    if (this.props.searchProperty.properties.length === 0) {
      properties = <h2>No Properties Found</h2>;
    }

    return (
      <div>
        <SearchNav />
        <br />
        <br />
        <br />
        <div className="container text-center   ">{properties}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchProperty: state.SearchPropertyReducer,
    isValidTokenState: state.TokenReducer.validity
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getPropertiesWhere, searchParams, checkValidity }
  )(ShowAllPropertiesPage)
);
