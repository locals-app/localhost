import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    }
  }

  render() {
    if (this.state.ready) {
      return (
        <div>
        </div>
      )
    } else {
      return (
        <div>
         Loading
        </div>
      )}
  }
}

export default App;