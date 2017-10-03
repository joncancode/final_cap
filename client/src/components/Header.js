import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './styles/Header.css';
/*
class Header extends React.Component {
    renderUser() {
        if (typeof this.props.currentUser === 'string') {
          return (
              <div>
                <span>logged in as {this.props.currentUser}</span>
                <button>Log out</button>
              </div>
          );
        } else {
          return (
            <div>
                <span>Not logged in</span>
                <button>Sign up</button>
            </div>
        );
        }
      }
    render() {
        return (
            <div className="header">
                <h1>App Name</h1>
                    {this.renderUser()}
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser
    };
};

export default connect(mapStateToProps)(Header);

*/


class Header extends Component {

    renderContent() {
      let stateme = null;
      switch (this.props.auth) {
        case null:
          break;
        case false:
        console.log('returning login in header')
          stateme = (
            <li>
              <a href="/api/auth/google">Login With Google</a>
            </li>
          );
          break;
        default:
        console.log('returning logout in header')
          stateme = (
            <li>
              <a href="/api/auth/logout">Logout</a>
            </li>
          );
      }
      console.log(stateme)
      return stateme;
    }
  
    render() {
      console.log(this.props);
      return (
        <nav>
          <div className="header">
            <ul className="auth-controls">
              <li style={{float:'left'}}><Link to={this.props.auth ? "/Home" : "/Login"} className="appName">Find Smithy</Link></li>
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