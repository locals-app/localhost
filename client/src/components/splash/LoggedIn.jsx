import React, { Component } from 'react';

// This is taken from the tutorial and will be usefull in getting profile images and text

var LoggedIn = React.createClass({
  
  getInitialState: function() {
    return {
      profile: null
    }
  },

  componentDidMount: function() {
    // The token is passed down from the App component 
    // and used to retrieve the profile
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      this.setState({profile});
    }.bind(this));
  },

  render: function() {
    if (this.state.profile) {
      return (
        <div>        
          <img src={this.state.profile.picture} />
          <h2>Welcome {this.state.profile.nickname}</h2>
        </div>
      );
    } else {
      return (
        <div className="loading">Loading profile</div>
      );
    }
  }

});

export default LoggedIn;