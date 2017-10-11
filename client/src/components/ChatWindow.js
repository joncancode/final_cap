import React from 'react';
import './styles/ChatWindow.css';

import io from 'socket.io-client';
let socket = io('http://localhost:3400');

//this component needs to be reduxified
let msgArr = [];
class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      message: '',
      msgArr: [],
      socket: socket,
      isTyping: '',
    };
  }

  componentDidMount() {
    socket.on(`send message`, data => {
      this.setState({
        message: '',
        msgArr: msgArr.push(data),
      });
      console.log('the array', msgArr);
    });
  }

  onChangeValue = e => {
    this.setState({
      message: e.target.value,
      isTyping: 'A user is typing...'
    });
    console.log(e.target.value);
    // socket.emit('user is typing', this.state.isTyping)
    this.userTyping(this.state.isTyping)
  };

  userTyping = isTyping => {
    socket.emit(`user is typing`, this.state.isTyping);
  };

  sendMessage = msgArr => {
    socket.emit(`send message`, msgArr);
    console.log(`this is the "send message"`, msgArr);
  };

  handleSubmit = e => {
    e.preventDefault();
    var message = this.state.message;
    this.sendMessage(message);
    this.setState({
      message: [message],
      isTyping: ''
    });
  };

  render() {
    return (
      <div className="chat-window">
        <div id="mainWrapper">
          <h2>Chatosphere</h2>
          <div id="chatWrapper">
            <div className="chatWindow">
            <div className="isTyping">

                <p>{this.state.isTyping}</p>
                
                </div>
              {msgArr.map(function(item) {
                return (
                  <ul className="listOfMessages" key="msgArr" >
                    <li key={item.key}>{item}</li>
                  </ul>
                );
              })}
            </div>
            <form id="messageForm" onSubmit={e => this.handleSubmit(e)}>
              <input
                ref={input => (this.input = input)}
                type="text"
                size="35"
                id="message"
                placeholder="Enter message here"
                value={this.state.message}
                onChange={this.onChangeValue}
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
