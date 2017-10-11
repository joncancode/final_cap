import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { fetchItems } from '../actions/';

import ProductWindow from './ProductWindow';
import './styles/MainWindow.css';
import './styles/ProductWindow.css';


class MainWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {upc: this.props.match.params.itemId,
        currentItem: 'cookie' }
    }

    //filter here by id with the data thats being passed in
    componentDidMount() {
        //get itemData props
        console.log('Component did mount PROPS', this.props)

        //filter
        console.log(this.state)
        
        //set state to filter
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ upc: nextProps.match.params.itemId})
    }

    renderResults(state) {
        // console.log('MAINWINDOW PROPS', this.props);
        




        if (this.props.loading) {
            // return <Spinner spinnerName="circle" noFadeIn />;

            // console.log('LOADING');
            return <div>loading items...</div>;
        }

        if (this.props.error) {
            return (
                <strong>
                    {this.props.error}
                </strong>
            );
        }

        if (this.props.itemData === null) {
            // console.log('NULL ERROR');
            return (
                <div className="product-window">
                    <p>didnt work. null</p>
                </div>
            )
        }
        // if (this.props.itemData.items) {
        if (this.props.itemData && this.state.upc) {
            const currentItem = this.props.itemData.items[0];
            // console.log('current item is....', currentItem)
            // console.log(this.state, 'UPC IN STATE')
            
            const storeData = currentItem.stores.map((item, index) =>
                <tr key={index}>
                    <th>Store</th>
                    <th>{item.name}</th>
                    <th>{item.inventory}</th>
                </tr>
            );

            return (
                <div className="product-window">
                    <div className="item-overview">
                        <h2>{currentItem.title}</h2>
                        <p>Added by {currentItem.creator}</p>
                        <img src={currentItem.images[0]}></img>
                    </div>
                    <div className="item-info">
                        <table>
                            <tr>
                                <th>Price</th>
                                <th>${currentItem.currency}</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>UPC Code</th>
                                <th>{currentItem.upc}</th>
                                <th></th>
                            </tr>
                            {storeData}
                        </table>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="product-window">
                    <p>nothing yet</p>
                </div>
            )
        }
    }


    render() {
        const renderState = this.state;
        
        // console.log('RENDER STATE', renderState);
        return (
            <div className="main-window">
                <Link to={`/Home/`}>
                    <span className="back-button">go back</span>
                </Link>
                <div className="user-sessions-container">
                    {this.renderResults(renderState)}
                    {/* <p>Hello</p> */}
                </div>
            </div>
        );
    }

}
const mapStateToProps = function (state) {
    return {
        loggedIn: state.loggedIn,
        itemData: state.itemData,
        activeItem: state.activeItem
    };
};

export default connect(mapStateToProps)(MainWindow);
