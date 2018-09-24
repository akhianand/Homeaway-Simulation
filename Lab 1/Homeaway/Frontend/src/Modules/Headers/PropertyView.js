import React, { Component } from "react";
import "react-dates/initialize";
import axios from "axios";
import { Carousel } from "react-bootstrap";

class PropertyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adl1: "",
      adl2: "",
      city: "",
      state: "",
      zip: 0,
      country: "",
      phone: 0,

      headline: "",
      description: "",
      placetype: "",
      bedrooms: 0,
      bathrooms: 0,
      accomdates: 0,

      images: "",

      startDate: null,
      endDate: null,

      currency: "",
      pricepernight: 0,
      minimumstay: 0,
      index: 0,
      direction: null,
      pid:12
    };
  }

  componentWillMount(){
      console.log(this.props.location.state.pid)
      this.setState({
          pid:this.props.location.state.pid
      });
  }

  componentDidMount() {
    const data = {
      pid: this.state.pid
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:8000/getParticularPropertyOfUser", data)
      .then(response => {
        if (response.status === 200) {
          if (response.data.success) {
            let adl1 = response.data.prop.adl1;
            let adl2 = response.data.prop.adl2;
            let city = response.data.prop.city;
            let state = response.data.prop.state;
            let zip = response.data.prop.zip;
            let country = response.data.prop.country;
            let phone = response.data.prop.phone;
            let headline = response.data.prop.headline;
            let description = response.data.prop.description;
            let type = response.data.prop.type;
            let bedrooms = response.data.prop.bedrooms;
            let bathrooms = response.data.prop.bathrooms;
            let accomodates = response.data.prop.accomodates;
            let currency = response.data.prop.currency;
            let baserent = response.data.prop.baserent;
            let minimumstay = response.data.prop.minimumstay;
            let availablefrom = response.data.prop.availablefrom;
            let availableto = response.data.prop.availableto;
            let photos = response.data.prop.photos;

            this.setState({
              adl1: adl1,
              adl2: adl2,
              city: city,
              state: state,
              zip: zip,
              country: country,
              phone: phone,
              headline: headline,
              description: description,
              placetype: type,
              bedrooms: bedrooms,
              bathrooms: bathrooms,
              accomdates: accomodates,
              currency: currency,
              pricepernight: baserent,
              minimumstay: minimumstay,
              startDate: availablefrom,
              endDate: availableto,
              images: photos
            });
            console.log();
          }
        }
      });
  }

  handleSelect(selectedIndex, e) {
    alert(`selected=${selectedIndex}, direction=${e.direction}`);
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    var images = this.state.images.split(",");
    let AvailableFrom = this.state.startDate;
    let AvailableTo = this.state.endDate;

    var fdate = new Date(AvailableFrom);
    var ldate = new Date(AvailableTo);

    var formatar =(fdate.getMonth() + 1) + '/' + fdate.getDate() + '/' +  fdate.getFullYear()
    var formatdep=(ldate.getMonth() + 1) + '/' + ldate.getDate() + '/' +  ldate.getFullYear()
 

    let imagesarray = images.map(image => {
      let ImageUrl = "./uploads/akhileshmalini@gmail.com/" + image;

      return (
        <Carousel.Item key={image}>
          <img width={900} height={500} alt="900x500" src={ImageUrl} />
        </Carousel.Item>
      );
    });

    return (
      <div>
        <nav
          className="navbar  navbar-light fixed-top  p-3 mb-5 bg-white"
          id="dashNav"
          style={{ background: "#ffffff" }}
        >
          <a className="navbar-brand" href="/LandingPage">
            <img
              src={"./img/HomeAway_LogoBlue.svg"}
              className="img-fluid"
              alt=""
            />
          </a>
        </nav>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="container">
          <div className="row">
            <div className="col-8">
              <Carousel>{imagesarray}</Carousel>
            </div>
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-title"><h3>{this.state.pricepernight}{this.state.currency}</h3> <small>per Night</small></div>
                  <p className="card-text">
                  Available from {formatar} to {formatdep}

                  </p>

                  <a href="/OwnerDash" className="btn btn-primary">
                    Other Properties
                  </a>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <h3>{this.state.headline}</h3>
          <h5>
            {this.state.adl1},{this.state.adl2},{this.state.city},
            {this.state.state},{this.state.country} <br/>
           
          </h5>
          Phone: {this.state.phone}
          <br />
          <br />
          <div className="row">
            <div className="col-2 ">
              <img
                src={"./img/sleeps.png"}
                className="img-fluid fillgrey"
                alt=""
              />
              <br />
              Sleeps
              <br />
              <h3>{this.state.accomdates}</h3>
            </div>
            <div className="col-2 ">
              <img
                src={"./img/beds.png"}
                className="img-fluid fillgrey"
                alt=""
              />
              <br />
              Beds
              <br />
              <h3>{this.state.bedrooms}</h3>
            </div>
            <div className="col-2 ">
              <img
                src={"./img/showers.png"}
                className="img-fluid fillgrey"
                alt=""
              />
              <br />
              Bathrooms
              <br />
              <h3>{this.state.bathrooms}</h3>
            </div>
            <div className="col-2 ">
              <img
                src={"./img/nights.png"}
                className="img-fluid fillgrey"
                alt=""
              />
              <br />
              Nights
              <br />
              <h3>{this.state.minimumstay}</h3>
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <div className="col-6">
              <h3>Description</h3>
              {this.state.description}
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyView;
