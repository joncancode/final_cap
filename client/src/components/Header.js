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

<<<<<<< HEAD
export default Header;
=======
const mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser
    };
};

export default connect(mapStateToProps)(Header);
>>>>>>> 4b677a11ed9e9d7cd8cbd5e30724883c996a839a
