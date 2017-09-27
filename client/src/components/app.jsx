import React, { Component } from 'react';
import axios from 'axios';
import ConversationStubs from './ConversationStubs.jsx';
import NavBar from './NavBar';

class App extends Component {
  constructor (props) {
    super();
    this.state = {
      userLocationSet: false,
    }
  }

  render() {
    return (
      <div>
        hellow worls
        <div>
          <NavBar />
        </div>
      </div>
    );
  }
}

export default App;