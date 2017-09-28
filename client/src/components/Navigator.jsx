// dependencies
import React, { Component } from 'react';
import { withRouter, BrowserRouter, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
// components
import Profile from './profile/Profile';
import Locals from './locals/Locals';
import Chat from './chat/Chat';
import Splash from './splash/Splash';

// creates navigation bar by which users will navigate through app

class Navigator extends Component {

    constructor (props) {
      super(props);
      this.state = {
        locationQuery: '',
      }
    }

    handleKeyPress (val, event) {
      if(event.key == 'Enter'){
        val.history.push('/Locals');
      }
      this.setState({ locationQuery: val.text });
    }

    render() {
      return (
        <div>
          <div>
            <div>
              <BrowserRouter lock={this.props.lock}>
                <div>
                  <Route exact path='/' render={(props) => (
                    <Splash
                      {...props}
                      lock={this.props.lock}
                      idToken={this.props.idToken}
                      handleKeyPress={this.handleKeyPress.bind(this)}
                    />
                  )}/>
                  <Route path='/Locals' render={(props) => (
                    <Locals
                      {...props}
                      lock={this.props.lock}
                      idToken={this.props.idToken}
                      locationQuery={this.state.locationQuery}
                    />
                  )}/>
                  <Route path='/Profile' render={(props) => (
                    <Profile
                      {...props}
                      lock={this.props.lock}
                      idToken={this.props.idToken}
                    />
                  )}/>
                  <Route path='/Chat' render={(props) => (
                    <Chat
                      {...props}
                      lock={this.props.lock}
                      idToken={this.props.idToken}
                    />
                  )}/>
                  <li><NavLink to='/'>Home</NavLink></li>
                  <li><NavLink to='/Profile' >Profile</NavLink></li>
                  <li><NavLink to='/Chat'>Chat</NavLink></li>
                  <li><NavLink to='/Locals'>Locals</NavLink></li>
                  <div className='logoutButton' onClick={this.props.logout}>Logout</div>

                </div>
              </BrowserRouter>
            </div>
          </div>
        </div>
      )
    }
}

export default Navigator;