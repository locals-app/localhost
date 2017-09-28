import React, { Component } from 'react';
const Rating = require('react-rating');

const Local  = ({local}) => {

  return (
    <div>
      <div>
      Username:  {local.username}
      </div>
      <div>
      Bio:  {local.biography}
      </div>
      <div>
      Location:  {local.location}
      </div>
      <div>
      Rating:  {local.rating}
      <Rating empty="fa fa-star-o fa-2x" full="fa fa-star fa-2x" placeholder="fa fa-star fa-2x" fractions={2} placeholderRate={local.rating}/>
      </div>
    </div>
  )

};

export default Local;