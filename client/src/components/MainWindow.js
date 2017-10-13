import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';

const faker = require('faker');
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { addStore } from '../actions/';

// import ProductWindow from './ProductWindow';
import './styles/MainWindow.css';
// import './styles/ProductWindow.css';


class MainWindow extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        //uses params from WishList routing to select current item by upc code
        this.state = {
            upc: this.props.match.params.itemId,
            currentItem: undefined
        }
    }



    componentWillReceiveProps(nextProps) {
        // console.log('NEXT PROPS......', nextProps)
        // this.setState( { stores: nextProps.stores } )
        //updates upc in local state on new route
        this.setState({ upc: nextProps.match.params.itemId })

        //sets currentItem by filtering upc code from local state through itemData
        const filteredItem = nextProps.itemData.items.filter(x => x.upc == this.props.match.params.itemId)
        this.setState({ currentItem: filteredItem })
    }

    handleSubmit(event) {
        event.preventDefault();
        const id = this.state.currentItem[0]._id;
        // console.log('ID', id)
        const placeholderStore = {
            "id": `${id}`,
            "store": {
                "name": faker.company.companyName(),
                "inventory": faker.name.findName()
            }
        }
        // console.log('placeholder store....', placeholderStore)
        this.props.dispatch(addStore(placeholderStore));
        //ACTION FOR SUBMIT
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

        if (this.state.currentItem === null) {
            // console.log('NULL ERROR');
            return (
                <div className="main-window">
                    <p>didnt work. null</p>
                </div>
            )
        }
        // if (this.props.itemData.items) {
        if (this.state.currentItem && this.state.upc) {
            const currentItem = this.state.currentItem[0];
            // const currentItem = this.props.itemData.items[0];
            // console.log(this.state, 'STATE')
            console.log('current item is....', currentItem)
            // console.log(this.state, 'UPC IN STATE')

            const storeData = currentItem.stores.map((item, index) =>
                <tr key={index}>
                    <th>Store</th>
                    <th>{item.name}</th>
                    <th>last seen by {item.inventory}</th>
                </tr>
            );

            return (
                <div className="main-window">
                    <div className="item-overview">
                        <h2>{currentItem.title}</h2>
                        <p>Added by {currentItem.creator}</p>
                        {<img src={currentItem.images[0]}></img>}
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
                            <form onSubmit={this.handleSubmit}>
                                <button type="submit">Add store</button>
                            </form>
                        </table>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="main-window">
                    <p>Select an item</p>
                </div>
            )
        }
    }


    render() {
        const renderState = this.state;

        // console.log('RENDER STATE', renderState);
        return (
            <div className="rendered-main-window-container">
                <Link to={`/Home/`}>
                    <button className="back-button">Home</button>
                </Link>
                <div className="main-window">
                    <div>
                        {this.renderResults(renderState)}
                        {/* <p>Hello</p> */}
                    </div>
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
