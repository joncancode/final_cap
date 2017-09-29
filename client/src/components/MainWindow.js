import React from 'react';
import { connect } from 'react-redux';

import ProductWindow from './ProductWindow';
import './styles/MainWindow.css';


class MainWindow extends React.Component {

    render() {
        if (this.props.loggedIn !== true) {
            return (
                <div className="main-window">
                <p>not logged in</p>
                </div>
            )
        }
        else {
            return (
                < ProductWindow />
            )
        }
    }
}

const mapStateToProps = function(state) {
    return {
        loggedIn: state.loggedIn
    };
};

export default connect(mapStateToProps)(MainWindow);
