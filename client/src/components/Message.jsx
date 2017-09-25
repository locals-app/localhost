import React, { Component } from 'react';

const Message = ({message}) => {
  return (
    <li><b>{message.userId}: </b>{message.text}</li>
  )
};

export default Message;