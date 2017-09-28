import React, { Component } from 'react';
import ConversationStubs from './ConversationStubs';
import { NavLink, withRouter} from 'react-router-dom';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.props.handleKeyPress.bind(this);
  }

  render() {
    return (
      <div>
        <input onKeyPress={this.handleKeyPress} type="text"/>
        <ConversationStubs />
      </div>
    )
  }
}

export default withRouter(Splash);