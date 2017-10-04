import React from 'react';
import './styles/ChatWindow.css';

import io from 'socket.io-client'
let socket = io('http://localhost:3400')

//this component needs to be reduxified 
let msgArr = [];
class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      message: '',
      msgArr: [],
      socket: socket
    };
  }

  componentDidMount() {   
    socket.on(`send message`, data => {
      

      this.setState({
        message: [data],
        msgArr: msgArr.push(data)
      })
      console.log('messageArr', msgArr)

      console.log('send message: ', data);

    })
  }

    onChangeValue = e => {
      this.setState({
        message: e.target.value
      });
      console.log(e.target.value)
    };

    sendMessage = msgArr => {
      socket.emit(`send message`, msgArr);
      console.log(`this is the "send message"`, msgArr);
    }

    handleSubmit = (e) => {
      e.preventDefault();
      console.log('form submit');
  
      var message = this.state.message;
      this.sendMessage(message);
      this.setState({
        message: [message]
      })
      console.log('state', this.state)
    }

  render() {
    // const arr = ['one', 'two', 'three']
    return (
      <div className="chat-window">
        <div id="mainWrapper">
          <h2>Chatosphere</h2>
          <div id="chatWrapper">
            <ul className="chatWindow">
            
            {msgArr.map(function (item) {
                return (
                  <li className="listOfMessages">
                  <br/><li>{item}</li><br/>
                  </li>
                )
              })}


            </ul>
            <form id="messageForm" onSubmit={e => this.handleSubmit(e)}
              >
              <input 
              ref={input => this.input = input} 
                type="text"
                size="35"
                id="message"
                placeholder="Enter message here"
                //value={this.state.message}
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
