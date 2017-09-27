import React, { Component } from 'react';
import Message from './Message';

const Messages = ({messages, currentUser}) => {
  return (
    <div>
      {messages.map((message) => {
        return <Message message={message} key={message.id} currentUser={currentUser}/>
      })}
    </div>
  )
};

export default Messages;