import React, { Component } from 'react';
import WindowLayout from './WindowLayout'

import './styles/ChatWindow.css';

//this component needs to be reduxified 
class ChatWindow extends React.Component {
  
  render() {
    return (
      <div className="chat-window">
        <WindowLayout title="Chat Window" />
      </div>
    );
  }
}

export default ChatWindow;
