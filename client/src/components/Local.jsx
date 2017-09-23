import React, { Component } from 'react';

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
    </div>
  )

};

export default Local;