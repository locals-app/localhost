// dependencies
import React, { Component } from 'react';
import { withRouter, BrowserRouter, Route, NavLink , Router, Switch, HashRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
// components
import Profile from '../profile/Profile';
import Locals from '../locals/Locals';
import Chat from '../chat/Chat';
import Splash from '../splash/Splash';
import Geosuggest from 'react-geosuggest';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.showLock = () => props.lock.show()
  }
  
  render() {
    return (
      <div>
        {/* <div className="background"> */}
          <div>

          <video id="bgvid" autoPlay muted loop>
            <source src="./final-reduced-size.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <div className="container"> 
            <div className="row">
              <div className="col align-self-center">
                <div className="card w-50" id="signup-background">
                  <div className="crop">
                    <div id="signup-logo">
                      localhost
                  </div>
                  <video id="bgvid" playsInline autoPlay muted loop>
            <source src="./170609_C_Agra_113_1.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
                  <h4 id="sub-menu">
                    connecting tourists with locals
                    </h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item" id="sign-up-btn"><button onClick={this.showLock} className="saveProfile btn btn-primary btn-lg btn-block">Sign Up / Log In</button></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default SignIn;