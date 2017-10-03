import React from 'react';
import * as Cookies from 'js-cookie';

// import QuestionPage from './question-page';
import LoginPage from './Login';
import Header from './Header';
import WishList from './WishList';
import ProductWindow from './ProductWindow';
import ChatWindow from './ChatWindow';
import * as actions from "../actions";
import { BrowserRouter, Route } from "react-router-dom";
import { Component } from "react";
import { connect } from "react-redux";

import './styles/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        
        this.props.fetchUser(); // passing users to reducer
        console.log('xxxxx-xxx-xx-xx-xx-xx-xx---xx', this.props)
        
        // Job 4: Redux-ify all of the state and fetch calls to async actions.
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            fetch('/api/current_user', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
                        // Unauthorized, clear the cookie and go to
                        // the login page
                        Cookies.remove('accessToken');
                        return;
                    }
                    throw new Error(res.statusText);
                }
                return res;
            }).then(currentUser =>
                this.setState({
                    currentUser
                })

            )
        // .catch(err => {
        //     console.log({err});
        //     res.status(500).json({ message: 'Internal error' });
        // });
        }
       
    }

    render() {
        // if (!this.state.currentUser) {
        //     return <LoginPage />;
        // }

        return(
            <div className="app">
                <div className="main-container">
                    <BrowserRouter>
                        <div>
                            <Header />
                            <Route exact path="/Login" component= {LoginPage} />
                            {/* <Route exact path="/Home" component= {WishList} /> */}
                            <Route exact path="/Home" component= {ChatWindow} />
                            {/* <Route exact path="/Home" component= {ProductWindow} /> */}
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

// export default App;
export default connect(null, actions)(App);