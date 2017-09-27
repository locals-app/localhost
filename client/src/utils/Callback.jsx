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
    window.location.href = '/';
  }

  render() {
    return null;
  }
}

export default Callback;