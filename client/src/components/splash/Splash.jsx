import React, { Component } from 'react';
import OpenConversations from './OpenConversations';
import { withRouter } from 'react-router-dom';
import Geosuggest from 'react-geosuggest';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      history: this.props.history,
    }
    this.handleSuggest = this.handleSuggest.bind(this);
  }

  handleSuggest(value) {
    this.setState({ text: value.label }, () => {
      this.props.handleSelect.call(null, this.state)
    });
  }

  render() {
    let { myMessages, currentUser, launchChat } = this.props
    return (
      <div>

        <div className="splash-page-container">
          <div className="container">
            <div className="row">
              <div className="col-8 geosuggest-column">

                <div className="geosuggest-container">
                  <Geosuggest 
                  onSuggestSelect={this.handleSuggest}
                  placeholder={'Where would you like to go?'}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>


        <div>
          <OpenConversations
            myMessages={myMessages}
            currentUser={currentUser}
            launchChat={launchChat}
          />
        </div>

      </div>
    )
  }
}

export default withRouter(Splash);