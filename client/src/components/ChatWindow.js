import React from 'react';
import './styles/ChatWindow.css';

import io from 'socket.io-client'
let socket = io('http://localhost:3400')

//this component needs to be reduxified 
class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      message: [],
      socket: socket
    };
  }

  componentDidMount() {   
    socket.on(`new message `, data => {
      console.log('new message: ', data);
    })
  }

    onChangeValue = e => {
      this.setState({
        message: e.target.value
      });
      console.log(e.target.value)
    };

    sendMessage = message => {
      socket.emit(`send message`, message);
      console.log(`this is the "send message"`, message);
    }

    handleSubmit = (e) => {
      e.preventDefault();
      console.log('form submit');
  
      var message = this.input.value;
  
      this.sendMessage(message);
      
      this.setState({
        message: message
      })
      console.log('state', this.state)
    }



  render() {
    return (
      <div className="chat-window">
        <div id="mainWrapper">
          <h2>Chatosphere</h2>
          <div id="chatWrapper">
            <ul className="chatWindow">
              <li>{this.state.message}</li>
            </ul>
            <form id="messageForm" onSubmit={e => this.handleSubmit(e)}
              >
              <input 
              ref={input => this.input = input} 
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
