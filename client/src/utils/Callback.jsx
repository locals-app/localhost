import React, { Component } from 'react';
import {setAccessToken, setIdToken} from './AuthService';
class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    setAccessToken();
    setIdToken();
    console.log(window);
    window.location.href = '/';
  }

  render() {
    return (
      <div>
        Loading
      </div>
    )
  }
}

export default Callback;