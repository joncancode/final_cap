import React from 'react';
import { VERIFY_USER } from '../../../server/socketEvents'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      error: ''
    };
  }

setUser = ({user, isUser}) => {
    console.log('user and is user', user, isUser)
    if(isUser) {
        this.setError('User name not available')
    } else {
        this.props.setUser(user)
    }
}

  handleSubmit = e => {
    e.preventDefault();

    const { socket } = this.props;
    const { nickname } = this.state
    socket.emit(VERIFY_USER, nickname, this.setUser)
  };

  handleChange = (e) => {
    this.setState({nickname:e.target.value})
  };

  setError = (error) => {
    this.setState({error})
  }

  render() {
    const { nickname, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="nickname">
            <h2>What should we call you?</h2>
            <input
              ref={input => {
                this.textInput = input;
              }}
              type="text"
              id="nickname"
              value={nickname}
              onChange={this.handleChange}
              placeHolder={"what's your username?"}
            />
            <div className="error">{error ? error : null} </div>
          </label>
        </form>
      </div>
    );
  }
}
