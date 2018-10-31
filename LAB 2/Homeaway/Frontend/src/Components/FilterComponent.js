import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { renderPriceList } from "./renderSelector";
import { renderFieldLarge } from "./renderField";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

//Validations
const required = value =>
  value || typeof value === "number" ? undefined : "Required";
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength20 = maxLength(20);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength2 = minLength(2);
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const maxValue = max => value =>
  value && value > max ? `Cannot Exceed ${max}` : undefined;
const maxValue20 = maxValue(20);
const minValue1 = minValue(1);
const alphabets = value =>
  value && /[^a-zA-Z ]/i.test(value) ? "Only alphabet characters" : undefined;
const startGtEnd = value => {
  if (value !== undefined) {
    if (value.startDate !== null && value.endDate !== null) {
      return undefined;
    } else {
      return "Both Required";
    }
  }
};

class FilterPropertyForm extends Component {
  render() {
    const { handleSubmit, color } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="card-body ">
          <div className="row">
            <div className="col-2 text-left">
              <Field
                name="lowerlimit"
                component={renderPriceList}
                label="Lower Limit"
              />
            </div>
            <div className="col-2 text-left">
              <Field
                name="upperlimit"
                component={renderPriceList}
                label="UpperLimit"
              />
            </div>
            <div className="col-3 text-left">
              <small>Bedrooms</small>

              <Field
                name="bedrooms"
                type="number"
                component={renderFieldLarge}
                label="Bedrooms"
                validate={[number, minValue1, maxValue20]}
              />
            </div>

            <div className="col-4 text-left">
              <br />
              <button
                type="button"
                onClick={handleSubmit}
                className=" roundcornerbutton btn btn-primary btn-lg ">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filter&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

FilterPropertyForm = reduxForm({
  form: "filterPropertyForm"
})(FilterPropertyForm);

export default connect(state => ({}))(FilterPropertyForm);
