import React, { Component } from 'react';
const Rating = require('react-rating');
import axios from 'axios';

class Local extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputRating: ''
    }
    this.changeRating = this.changeRating.bind(this);
  }

  changeRating(input) {
    console.log('button input worked');
    if (this.state.inputRating === '') {
      this.setState({
        inputRating: input
      });
      let newRating = {
        inputRating: input
      };
      console.log('state has been set');
      axios.post(`/api/changerating/${this.props.local.username}`, newRating)
        .then((res) => {
          console.log(res);
        })
          .catch((err) => {
            console.log('error setting new rating: ', err);
          })
    }
  }

  render() {
    return (
      <div>
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
          <Rating empty="fa fa-star-o fa-2x" full="fa fa-star fa-2x" placeholder="fa fa-star fa-2x" fractions={2}  onChange={this.changeRating} placeholderRate={this.props.local.rating}/>
        </div>
      </div>
    )
  }
}

export default Local;