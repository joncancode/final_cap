import React from 'react';
import { connect } from 'react-redux';

import './styles/Header.css';

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
