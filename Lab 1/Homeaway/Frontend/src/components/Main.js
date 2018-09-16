import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './LandingPage/landingpage';
import Login from './Login/Login';


class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/LandingPage" component={LandingPage}/>
                <Route path="/Login" component={Login}/>

            </div>
        )
    }
}
//Export The Main Component
export default Main;