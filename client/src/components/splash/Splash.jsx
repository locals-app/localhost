import React, { Component } from 'react';
import ConversationStubs from './ConversationStubs';
import { NavLink } from 'react-router-dom';

class Splash extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input onKeyPress={this.props.handleKeyPress} type="text"/>
        <ConversationStubs />
      </div>
    )
  }
}

export default Splash;