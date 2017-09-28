import React, { Component } from 'react';
const Rating = require('react-rating');

class Local extends Component {
  constructor(props) {
    super(props);
    this.changeRating = this.changeRating.bind(this);
  }

  changeRating() {
    
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
          <Rating empty="fa fa-star-o fa-2x" full="fa fa-star fa-2x" placeholder="fa fa-star fa-2x" fractions={2} placeholderRate={this.props.local.rating}/>
        </div>
      </div>
    )
  }
}

export default Local;