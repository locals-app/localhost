import React, { Component } from 'react';
import axios from 'axios';
import ConversationStubs from './ConversationStubs';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocationSet: false,
    }
  }

  render() {

    if (this.state.userLocationSet) {
      
      return (
        <div>
          <input type="text" name="whereTo"/>
          <h1>Ongoing Conversations</h1>
          <ConversationStubs />
        </div>
      )
    } 
    
    else {
      return (
        <div> Set your location </div>
      )
    }

  }
  
}

export default App;