import React, { Component } from 'react';
import Message from './Message';

const Messages = ({messages}) => {
  return (
    <div>
      {messages.map((message) => {
        return <Message message={message} key={message.id}/>
      })}
    </div>
  )
};

export default Messages;