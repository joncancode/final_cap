import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../../../server/socketEvents';
import './styles/ChatWindow.css';
import LoginForm from './LoginForm'

const socketUrl = 'http://localhost:3300';
//this component needs to be reduxified
export default class WindowLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      user: null
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('socket connected');
    });
    this.setState({ socket });
  };

  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  };

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };

  render() {
    const { title } = this.props;
    const { socket } = this.state
    return (
    <div>
        {title}
        <LoginForm socket={socket} setUser={this.setUser} />
    </div>
    )
  }
}
