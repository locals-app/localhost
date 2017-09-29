import React, { Component } from 'react';
import Rating from 'react-rating';
import axios from 'axios';

class Local extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputRating: ''
    }
    this.changeRating = this.changeRating.bind(this);
    this.parsedRating = JSON.parse(this.props.local.rating);
    this.averagedParsedRating = ((this.parsedRating.reduce((acc, rating) => {
      return acc + rating
    }, 0))/this.parsedRating.length);
  }

  changeRating(input) {
    if (this.state.inputRating === '') {
      this.setState({
        inputRating: input
      });
      this.parsedRating.push(input);
      const newRating = {
        inputRating: JSON.stringify(this.parsedRating)
      };
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
          <Rating empty="fa fa-star-o fa-2x" full="fa fa-star fa-2x" placeholder="fa fa-star fa-2x" fractions={2}  onChange={this.changeRating} placeholderRate={this.averagedParsedRating}/>
        </div>
      </div>
    )
  }
}

export default Local;