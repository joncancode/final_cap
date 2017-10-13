import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './styles/Header.css';

export class Header extends Component {
  renderContent() {
    return !this.props.currentUser ? (
      <li>
        <a className='user-log' href="/api/auth/google">Login With Google</a>
      </li>
    ) : (
      <li>
        <a className='user-log' href="/api/auth/logout">Logout</a>
      </li>
    );
  }

  render() {
    // console.log('Header render() this.props: ', this.props);
    return (
      <nav>
        <div className="header">
          <ul className="auth-controls">
            <li style={{float:'left'}}><Link to={this.props.auth ? "#" : "#"} className="appName">Find Smithy</Link></li>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}
  
function mapStateToProps({ auth }) {
  return { auth };
}
  
export default connect(mapStateToProps)(Header);