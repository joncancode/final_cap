import React from 'react';

import './styles/ChatWindow.css';

class ChatWindow extends React.Component {
constructor(props) {
    super(props)
    this.state = {
        user: '',
        password: '',
        text: '',
     }
}

handleSignup = (e) => {
    e.preventDefault();
    //needs to have a dispatch from action
        this.setState( {user: 'Bob',
            password: 'password'} )
}


handleSubmit = (e) => {
    e.preventDefault();
    //needs to have a dispatch from action
        this.setState( {user: 'Bob',
            text: 'Hello'} )
}

  render() {
    return (
      <div className="chat-window">
        <div id="namesWrapper">
          <h2>Chatosphere</h2>
          <p>Create profile:</p>
          <div id="error" />
          <form id="usernameForm" onSubmit={e => this.handleSignup(e)} >
            <input type="text" size="30" id="username" placeholder="User" />
            <input type="text" size="30" id="username" placeholder="Password" />
            <input id="submit" type="submit" value="Submit" />
          </form>
        </div>

        <div id="mainWrapper">
          <h2>Chatosphere</h2>
          <div id="chatWrapper">
            <div id="chatWindow" />
            <form id="messageForm" onSubmit={e => this.handleSubmit(e)}>
              <input
                type="text"
                size="35"
                id="message"
                placeholder="Enter message here"
                value={this.state.text}
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
