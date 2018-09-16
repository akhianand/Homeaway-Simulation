import React, { Component } from "react";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

class LandingHeader extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      date: moment()
    };
  }

  render() {
    return (
      <header className="masthead">
        <div className="  d-flex  h-100 align-items-center">
          <div className="mx-auto text-left ">
            <h1 className="increaseWidth">Book beach houses, cabins,</h1>
            <h1 className="increaseWidth">condos and more, worldwide</h1>
            <div className="card mastcard increaseWidth">
              <div className="card-body mastcardContent ">
                <div className="row">
                  <div className="col-6 ">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Where do you want to go?"
                    />{" "}
                  </div>
                  <div className="col-3">
                    <DateRangePicker
                      startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                      onDatesChange={({ startDate, endDate }) =>
                        this.setState({ startDate, endDate })
                      } // PropTypes.func.isRequired,
                      focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                      onFocusChange={focusedInput =>
                        this.setState({ focusedInput })
                      } // PropTypes.func.isRequired,
                    />
                  </div>
                  <div className="col-2">
                    <select class="form-control form-control-lg">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default LandingHeader;