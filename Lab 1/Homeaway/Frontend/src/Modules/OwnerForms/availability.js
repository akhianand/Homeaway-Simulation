import React, { Component } from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

class AvailabilityForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
        startDate:null,
        endDate:null
    };
  }

  datesChageHandler =({ startDate, endDate }) =>{
    this.setState({ startDate, endDate })
  }

  render() {
    return (
      <div className="col-9">
        <div class="card sharpEdges shadow-lg">
          <div class="card-body">
            <h5 class="card-title">Availability</h5>
            <hr />
            <p class="card-text text-center">

              <br/><br/><br/>
   
    <DateRangePicker
                      startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                      onDatesChange={this.datesChageHandler} // PropTypes.func.isRequired,
                      focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                      onFocusChange={focusedInput =>
                        this.setState({ focusedInput })
                      } // PropTypes.func.isRequired,
                    />
           
           <br/><br/><br/><br/>
                          <hr />

              <div className="row">
                <div className="col-2 offset-2">
                  <button
                    type="button"
                    class="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                  >
                    Back
                  </button>
                </div>
                <div className="col-2 offset-4">
                  <button
                    type="button"
                    class="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AvailabilityForm;
