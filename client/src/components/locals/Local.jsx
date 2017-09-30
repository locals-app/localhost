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
    }
    this.changeRating = this.changeRating.bind(this);
    this.parsedRating = JSON.parse(this.props.local.rating);
    this.averagedParsedRating = ((this.parsedRating.reduce((acc, rating) => {
      return acc + rating
    }, 0))/this.parsedRating.length);
  }

  createConversation() {

    axios.post('/api/modifyconversation', {
      firstUser: this.props.currentUser,
      secondUser: this.props.local.username,
    }).then((results) => {
      this.setState({messages: [{conversationId: results.data.id}]}, () => {
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
        <div onClick={this.createConversation.bind(this)}>
          <div>
          Username:  {this.props.local.username}
          </div>
          <div>
          Bio:  {this.props.local.biography}
          </div>
          <div>
          Location:  {this.props.local.location}
          </div>
          <div>
            <Rating empty="fa fa-star-o fa-2x" full="fa fa-star fa-2x" placeholder="fa fa-star fa-2x" fractions={2}  onChange={this.changeRating} placeholderRate={this.averagedParsedRating}/>
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