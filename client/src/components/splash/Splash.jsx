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

        <div className="user-help-modal text-right">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Need Halp <i className="fa fa-question-circle" aria-hidden="true"></i>
          </button>
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Guide</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body text-left">
                  <h6 className="instructions-title">Create a profile</h6>
                  <ol className="instructions-list">
                    <li>Click your profile picture in the upper right hand corner</li>
                    <li>Enter in the city that you're a local of</li>
                    <li>Tell us about yourself in the bio</li>
                    <li>To list yourself as a local, toggle the "<strong>Are you a local?</strong>" button (recommended)</li>
                    <li>Click "<strong>Save Changes</strong>"</li>
                  </ol>
                  <p></p>
                  <h6 className="instructions-title">Get in touch with a local</h6>
                  <ol className="instructions-list">
                    <li>On the homepage, enter in the destination you would like to visit</li>
                    <li>View the list of locals of that destination</li>
                    <li>Find a local and click their "<strong>Message</strong>" button to start chatting</li>
                  </ol>
                  <h6 className="instructions-title">View your conversations</h6>
                  <ol className="instructions-list">
                    <li>On the homepage, click the "<strong>Messages</strong>" button to view your conversations</li>
                    <li>To view a conversation with a user, click on their info</li>
                    <li>To delete a conversation with a user, click the "<strong>Delete this conversation</strong>" button</li>
                  </ol>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Got it!</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button className="btn btn-primary message-button-splash" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Messages <i className="fa fa-comment" aria-hidden="true"></i>
          </button>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <div>
                <OpenConversations
                  myMessages={myMessages}
                  currentUser={currentUser}
                  launchChat={launchChat}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default withRouter(Splash);