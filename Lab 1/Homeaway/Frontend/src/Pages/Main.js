import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import TravelDash from './TravellerDash/TravelDash';


class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/LandingPage" component={LandingPage}/>
                <Route path="/Login" component={Login}/>
                <Route path="/SignUp" component={SignUp}/>
                <Route path="/TravelDash" component={TravelDash}/>

            </div>
        )
    }
}
//Export The Main Component
export default Main;

