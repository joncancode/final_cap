import React from 'react';
import * as Cookies from 'js-cookie';
import {BrowserHistory, BrowserRouter, Link, Router, Route} from 'react-router-dom';
import LoginPage from './login-page';
import Header from './Header';
import WishList from './WishList';
import MainWindow from './MainWindow';
import ProductWindow from './ProductWindow';
import ChatWindow from './ChatWindow';
import Test from './Test';
import * as actions from "../actions";
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
        const accessToken = Cookies.get('accessToken');
        // console.log('App Component accessToken: ', accessToken)
        if (accessToken) {
            fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
                        // Unauthorized, clear the cookie and go to the login page
                        console.log('componentDidMount, you are unauthorized')
                        Cookies.remove('accessToken');
                        return;
                    }
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then(currentUser =>
                this.setState({
                    currentUser
                })
            );
        }
    }
    passItemDataToParent = (data) => {
        console.log(data, 'DATA IN CALLBACK')
    }

    render() {
        return(
            <BrowserRouter history={BrowserHistory}>
                <div className="app">
                    < Header currentUser={this.state.currentUser}/>
                    <div className="main-container">
                        <Route exact path="/" component={LoginPage} />
                        <Route exact path="/LoginPage" component={LoginPage} />
                        <Route exact path="/Home/" component={WishList} callbackFromParent={this.passItemDataToParent}/> 
                        <Route exact path="/Home/:itemId" component={WishList} callbackFromParent={this.passItemDataToParent}/> 
                        <Route exact path="/Home/" component={MainWindow}/>
                        <Route exact path="/Home/:itemId" component={MainWindow}/>
                        <Route exact path="/Home/" component={ChatWindow}/>
                        <Route exact path="/Home/:itemId" component={ChatWindow}/>
                        <Route exact path="/Home/items/" component={MainWindow}/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, actions)(App);

