import React, { Component } from 'react';
import Rating from 'react-rating';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Local extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputRating: '',
      messages: [],
      history: this.props.history,
      otherUserImageUrl: '',
    }
    this.changeRating = this.changeRating.bind(this);
    this.getOtherUserImage = this.getOtherUserImage.bind(this);
    this.parsedRating = JSON.parse(this.props.local.rating);
    this.averagedParsedRating = ((this.parsedRating.reduce((acc, rating) => {
      return acc + rating
    }, 0))/this.parsedRating.length);
  }

  componentWillMount() {
    this.getOtherUserImage()
  }

  getOtherUserImage() {
    axios.get(`api/profiles/${this.props.local.username}`).then((userData) => {
      this.setState({otherUserImageUrl: userData.data.imageUrl})
    }).catch(err => console.error(err))
  }

  createConversation() {
    axios.post('/api/modifyconversation', {
      firstUser: this.props.currentUser,
      secondUser: this.props.local.username,
    }).then((results) => {
      this.setState({messages: [{
        conversationId: results.data.id, userId: this.props.local.username}]}, () => {
        this.props.launchChat.call(null, this.state);
      });
    }).catch((err) => {
      console.log('post did not work', err);
    });
  }
 
  changeRating(input) {
    console.log('button input worked');
    if (this.state.inputRating === '') {
      this.setState({
        inputRating: input
      });
      this.parsedRating.push(input);
      const newRating = {
        inputRating: JSON.stringify(this.parsedRating)
      };
      console.log('state has been set');
      axios.post(`/api/changerating/${this.props.local.username}`, newRating)
        .then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log('error setting new rating: ', err);
        })
    }
  }

  render() {
    if (this.props.local.isLocal) {
      return (
          <div className="locals-media-entire">
            <div className="media">
              <img className="main-profile-small-img d-flex align-self-center mr-3 rounded-circle" src={this.state.otherUserImageUrl} alt="Profile image"/>
              <div className="media-body">
                <h5 className="mt-0">{this.props.local.username.replace('_', ' ')}</h5>
                <div>
                  <Rating empty="fa fa-star-o fa-2x" full="fa fa-star fa-2x" placeholder="fa fa-star fa-2x" fractions={2}  onChange={this.changeRating} placeholderRate={this.averagedParsedRating}/>
                </div>
                <p>{this.props.local.biography}</p>
                <button onClick={this.createConversation.bind(this)} type="button" className="btn btn-info btn-sm">Message</button>
              </div>
            </div>
          </div>
      )
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default withRouter(Local);