import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './styles/ChatWindow.css';

const io = require('socket.io-client');

//this component needs to be reduxified 
class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      text: '',
      chatText: ''
    };
  }

  // handleSignup = (e) => {
  //     e.preventDefault();
  //     //needs to have a dispatch from action
  //         this.setState( {user: 'Bob',
  //             password: 'password'} )
  // }

  componentDidMount(){
    this.socket = io.connect('http://localhost:3400');
    this.socket.on('connect', function(tradeMsg) {
        console.log("socket connected on component");
    });
}

  handleSubmit = e => {
    e.preventDefault();
    console.log('form submit');
    this.setState({
      // return {
      user: 'userguy: ',
      text: 'to be input text',
      chatText: 'chat'
      // }
    })
    console.log(this.state);
  }

  render() {
    return (
      <div className="chat-window">
        <div id="mainWrapper">
          <h2>Chatosphere</h2>
          <div id="chatWrapper">
            <ul className="chatWindow">
              <li><strong>{this.state.user}</strong> {this.state.chatText}</li>
            </ul>
            <form id="messageForm" onSubmit={e => this.handleSubmit(e)}>
              <input
                type="text"
                size="35"
                id="message"
                placeholder="Enter message here"
                value={this.state.value}
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatWindow;
