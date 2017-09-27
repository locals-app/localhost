import React, { Component } from 'react';

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
      this.setState({profile: profile});
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