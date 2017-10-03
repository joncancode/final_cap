import React from 'react';
import * as Cookies from 'js-cookie';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import QuestionPage from './question-page';
import LoginPage from './login-page';
import Header from './Header';
import WishList from './WishList';
import MainWindow from './MainWindow';
import ChatWindow from './ChatWindow';



import './styles/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        // Job 4: Redux-ify all of the state and fetch calls to async actions.
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            fetch('/api/me', {
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
                return res.json();
            }).then(currentUser =>
                this.setState({
                    currentUser
                })
            );
        }
    }

    render() {
        // if (!this.state.currentUser) {
        //     return <LoginPage />;
        // }

        // return <QuestionPage />;
        return(
            <div className="app">
                < Header />
                    {/* <Router> */}
                        {/* <Switch> */}
                            <div className="main-container">
                                < WishList />
                                {/* <Route name="items" path="/items" component={WishList} /> */}
                                < MainWindow />
                                {/* <Route name="items" path="/items:id" component={MainWindow} {...appProps}/> */}
                                < ChatWindow />
                            </div>
                            
                        {/* </Switch> */}
                    {/* </Router> */}
            </div>
        )
    }
}

export default App;
