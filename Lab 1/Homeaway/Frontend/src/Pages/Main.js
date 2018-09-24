import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Login from './Login/Login';
import OwnerLogin from './Login/OwnerLogin';
import SignUp from './SignUp/SignUp';
import TravelDash from './TravellerDash/TravelDash';
import OwnerDash from './Owners/OwnersDash';
import PropertyView from '../Modules/Headers/PropertyView';
import OwnerPropertyAdd from './Owners/OwnersAddProperty';
import ShowAllProperties from '../Modules/Headers/ShowProperties';

class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/LandingPage" component={LandingPage}/>
                <Route path="/Login" component={Login}/>
                <Route path="/SignUp" component={SignUp}/>
                <Route path="/TravelDash" component={TravelDash}/>
                <Route path="/OwnerPropertyAdd" component={OwnerPropertyAdd}/>
                <Route path="/OwnerLogin" component={OwnerLogin}/>
                <Route path="/OwnerDash" component={OwnerDash}/>
                <Route path="/PropertyView" component={PropertyView}/>
                <Route path="/Properties" component={ShowAllProperties}/>
            </div>
        )
    }
}   
//Export The Main Component
export default Main;

