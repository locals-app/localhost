import React, { Component } from 'react';
import ConversationStubs from './ConversationStubs';

class Splash extends Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="where do you want to go?" />
        <ConversationStubs />
      </div>
    )
  }
}

export default Splash;