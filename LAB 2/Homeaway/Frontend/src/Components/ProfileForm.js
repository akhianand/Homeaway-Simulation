import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {fetchUserData } from '../Actions/userActions';
import { renderFieldMedium } from "./renderField";

class ProfileForm extends Component {

    componentWillMount() {
        this.props.fetchUserData();
    }

    handleEditProfileFormSubmit(formProps) {
        console.log(formProps);
    }

  


    render() {
        const { handleSubmit } = this.props;

        const user = this.props.profile.user;

        return (
        <div> 
            <form onSubmit={handleSubmit(this.handleEditProfileFormSubmit.bind(this))}>
                <Field name="fname"   component={this.renderFieldMedium} type="text" placeholder="First Name" />
                <Field name="lname"   component={this.renderFieldMedium} type="text" placeholder="Last Name" />
                <Field name="aboutme"   component={this.renderFieldMedium} type="text" placeholder="About Me" />
                <Field name="city"   component={this.renderFieldMedium} type="text" placeholder="City, Country" />
                <Field name="school"   component={this.renderFieldMedium} type="text" placeholder="School" />
                <Field name="hometown"   component={this.renderFieldMedium} type="text" placeholder="Hometown" />
                <Field name="languages"   component={this.renderFieldMedium} type="text" placeholder="Languages" />
                <Field name="gender"   component={this.renderFieldMedium} type="text" placeholder="Gender" />
                <Field name="phone"   component={this.renderFieldMedium} type="text" placeholder="Phone" />
                <button action="submit" className="btn btn-primary">Edit user</button>
            </form>
        </div>
        );
    }

}

let ProfileFormInitialized = reduxForm({
    form: 'ProfileForm'
})(ProfileForm);

ProfileFormInitialized = connect(
  state => ({
    profile: state.ProfileReducer,
  }),
  {fetchUserData }
)(ProfileFormInitialized);

export default ProfileFormInitialized;


