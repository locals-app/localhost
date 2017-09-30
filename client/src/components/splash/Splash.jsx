import React, { Component } from 'react';
import OpenConversations from './OpenConversations';
import { withRouter } from 'react-router-dom';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      history: this.props.history,
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  render() {
    let { myMessages, handleKeyPress, currentUser, launchChat } = this.props
    return (
      <div>
        <input
          onChange={this.handleChange}
          onKeyPress={handleKeyPress.bind(null, this.state)}
          type="text"/>
        <OpenConversations
          myMessages={myMessages}
          currentUser={currentUser}
          launchChat={launchChat}
        />
      </div>
    )
  }
}

export default withRouter(Splash);