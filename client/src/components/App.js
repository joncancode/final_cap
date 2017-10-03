import React from 'react';
import * as Cookies from 'js-cookie';

import QuestionPage from './question-page';
import LoginPage from './login-page';
import Header from './Header';
import WishList from './WishList';
import ProductWindow from './ProductWindow';
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
                <div className="main-container">
                    < WishList />
                    < ProductWindow />
                    < ChatWindow />
                </div>
            </div>
        )
    }
}

export default App;
