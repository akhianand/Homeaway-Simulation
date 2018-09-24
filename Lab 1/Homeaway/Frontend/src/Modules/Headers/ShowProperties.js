import React, { Component } from "react";
import "react-dates/initialize";
import axios from "axios";
import { Redirect } from "react-router";
import LoginNav from "../../Modules/Navbar/LoginNav";

class ShowAllProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      propertyClicked: false,
      propertypid: ""
    };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:8000/getAllPropertiesWhere").then(response => {
      if (response.status === 200) {
        console.log(response.data);
        if (response.data.success) {
          this.setState({
            properties: response.data.rows
          });
        }
      }
    });
  }

   capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  onViewPropertyClickHandler = e => {
    console.log(e.currentTarget.value);
  };

  render() {
    let properties = this.state.properties.map(property => {
      var arr = property.photos.split(",");
      let ImageUrl = "./uploads/akhileshmalini@gmail.com/" + arr[0];

      return (
        <div className="row">
          <div className="col-8">
            <div key={property.pid} class="card">
              <div class="card-body">
                <div className="row">
                  <div className="col-4">
                   <img src={ImageUrl} alt="..." class="img-thumbnail" />
                  </div>
                  <div className="col-8">
                    <h3 class="card-title" >{property.headline}</h3>
                    <p class="card-text">{this.capitalizeFirstLetter(property.type)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{property.bedrooms}BR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{property.bathrooms}BR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sleeps&nbsp;{property.accomodates}
                    <br/><br/>
                        {property.baserent}{property.currency} <small>per Night</small>
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    let redirectVar = null;
    if (this.state.propertyClicked) {
      redirectVar = (
        <Redirect
          to={{
            pathname: "/PropertyView",
            state: { pid: this.state.propertypid }
          }}
        />
      );
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
        <br />
        <br />

        <div className="container">{properties}</div>
      </div>
    );
  }
}

export default ShowAllProperties;
