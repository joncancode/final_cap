import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import { BrowserHistory, BrowserRouter, Link, Router, Route } from 'react-router-dom';

import { fetchItems } from '../actions/';

import MainWindow from './MainWindow';
import AddItem from './AddItem';

const Modal = require('boron/ScaleModal');

import './styles/WishList.css';

class WishList extends React.Component {
    componentDidMount() {
        
        const accessToken = Cookies.get('accessToken');
        this.props.dispatch(fetchItems(accessToken));
        
    }

    //Add Item Modal 
    showModal() {
        this.refs.modal.show();
    }
    // hideModal() {
    //     this.refs.modal.hide();
    // }
    renderWishListItems() {
        if (this.props.itemData) {
            // console.log('YES THERE ARE ITEM DATA', this.props.itemData)
            const itemResults = this.props.itemData.items;
            const renderedItems = itemResults.map((item, index) => (
           
                <Link to={`/items/${item.upcCode}`}>
                    <li key={index}>
                        {item.itemName}
                    </li>
                </Link>
            ))
        }
        else {
            return (
                <p>not worked</p>
            )
        }
    }

    renderWishListItems() {
        // console.log('ITEM PROPS', this.props);
        if (this.props.itemData) {
            // console.log('ITEM DATA FROM RENDERIWISHLIST ITEMS', this.props.itemData.items)
            const itemResults = this.props.itemData.items;
            const renderedItems = itemResults.map((item, index) => (
                <li key={index}>
                    <Link to={`/Home/${item.upc}`}>
                        {item.title}
                    </Link>
                </li>
            ));
            return (
                <ul>
                    {renderedItems}
                </ul>
            )
        }
        else {
            return (
                <p>no data</p>
            )
        }
    }

    render() {
        // console.log('ITEM DATA PROPS', this.props)

        return (
            <div className="wish-list">
                <h2>Wish list</h2>
                <div>
                    <button onClick={this.showModal.bind(this)}>Add new item</button>
                    <Modal ref="modal" >
                        {<AddItem/>}
                    </Modal>
                </div>
                <div>
                    <ul>
                        {this.renderWishListItems()}
                    </ul>
                </div>
            </div>
        )
    }
}



const mapStateToProps = function (state) {
    return {
        itemData: state.itemData,
        loading: state.loading
    };
};

export default connect(mapStateToProps)(WishList);
