import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import ProductWindow from './ProductWindow';
import './styles/MainWindow.css';


class MainWindow extends React.Component {

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    render() {
        if (this.props.loggedIn === true) {
            
            
console.log('props', this.props);            
            return (

                    
                        <div className="main-window">
                    <ProductWindow/>
                            {/* <Route exact path="/" component={ProductWindow}/> */}
                        </div>
            )
        }
        else {
            return (
                <div className="main-window">
                <p>not logged in</p>
                </div>
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
