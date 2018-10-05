import React, { Component } from "react";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {withRouter} from "react-router-dom";

class LandingHeader extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      date: moment(),
      where: "",
      startDate: null,
      endDate: null,
      people: "1",
      searchedClicked: false
    };
  }

  onSearchClickedListener = () => {

    if(this.state.startDate===undefined || this.state.startDate===null ){
      this.setState({
        startDate:moment()
      })
    }
    
    if(this.state.endDate===undefined || this.state.endDate===null){
      this.setState({
        endDate:moment().add(1,"year")
      })
    } 

    this.setState({
      searchedClicked: true
    });
  };

  datesChageHandler = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  };

  WhereChangeHandler = e => {
    this.setState({
      where: e.target.value
    });
  };

  peopleChangeHandler = e => {
    this.setState({
      people: e.target.value
    });
  };

  render() {
    let redirectVar=null;
    if(this.state.searchedClicked){
      this.setState({
        searchedClicked:false
      });

     
      
      if(this.state.where.toString().replace(/\s/g,'')==="") { 
        alert("Where do you wanna go eh?");
      }
      else {
       this.props.history.push({
          pathname: '/Properties',
          state: {   where: this.state.where,
            startDate: this.state.startDate.toDate().toString(),
            endDate: this.state.endDate.toDate().toString(),
            people: this.state.people
          }   
      }) 
        }
  }

   
    return (
      <div>
          {redirectVar}
        <header className="masthead">
          <div className="  d-flex  h-100 align-items-center">
            <div className="mx-auto text-left ">
              <h1 className="increaseWidth">Book beach houses, cabins,</h1>
              <h1 className="increaseWidth">condos and more, worldwide</h1>
              <div className="card mastcard increaseWidthLesser">
                <div className="card-body mastcardContent ">
                  <div className="row">
                    <div className="col-4 ">
                    <small>Where</small>

                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Where do you want to go?"
                        value={this.state.where}
                        onChange={this.WhereChangeHandler}
                      />
                    </div>
                    <div className="col-3 ">
                    <small>When</small><br/>

                      <DateRangePicker
                        startDate={this.state.startDate} 
                        startDateId="your_unique_start_date_id"
                        endDate={this.state.endDate}
                        endDateId="your_unique_end_date_id"
                        onDatesChange={({ startDate, endDate }) =>
                          this.setState({ startDate, endDate })
                        }
                        focusedInput={this.state.focusedInput} 
                        onFocusChange={focusedInput =>
                          this.setState({ focusedInput })
                        }
                      />
                    </div>
                    <div className="col-2">
                        <small>No. of People</small>
                      <select
                        value={this.state.people}
                        onChange={this.peopleChangeHandler}
                        className="form-control form-control-lg"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>
                    <div className="col-1">
                    <br/>
                      <button
                        type="button"
                        onClick={this.onSearchClickedListener}
                        className=" roundcornerbutton btn btn-primary btn-lg"
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search&nbsp;&nbsp;&nbsp;&nbsp;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default withRouter(LandingHeader);
