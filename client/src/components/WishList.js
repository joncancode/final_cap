import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import { BrowserHistory, BrowserRouter, Link, Router, Route } from 'react-router-dom';

import { fetchItems } from '../actions/';

import MainWindow from './MainWindow';

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
    hideModal() {
        this.refs.modal.hide();
    }

    renderWishListItems() {


        if (this.props.itemData) {
            console.log('ITEM DATA FROM RENDERIWHSLIST ITEMS', this.props.itemData.items)
            const items = this.props.itemData.items[2];
            return (
                <BrowserRouter history={BrowserHistory}>
                    <ul>
                        <li>
                        <Link to={`/items/${items.upc}`}>
                            {items.title}
                        </Link>
                        </li>
                    </ul>
                </BrowserRouter>
            )
        



            // const wishListItems = this.props.itemData.items.map((item, index) =>

            //     <BrowserRouter history={BrowserHistory}>
            //     <ul>
            //         <li key={item}>
            //         {/* <Link to={`/items/${i.upc}`}> */}
            //         who cares
            //                 {/* {item.title} */}
            //         {/* </Link>  */}
            //         </li>
            //     </ul>
            // //     /* </BrowserRouter> */
            // );
            // return (
            //     {wishListItems}
            // )
            // return (
            //     <li>{this.props.itemData.items[0].title}</li>
            // )

        }
        else {

            return (
                <p>not yet, chief</p>
            )
        }
    }

    render() {
        console.log('ITEM DATA PROPS', this.props)

        return (
            <div className="wish-list">
                <h2>Wish list</h2>
                <div>
                    <button onClick={this.showModal.bind(this)}>Add new item</button>
                    <Modal ref="modal" >
                        <div className="add-item-modal">
                            <h2>Add new item</h2>
                            <input type="text" />
                            <button onClick={this.showModal.bind(this)}>Search</button>
                            {/* <Modal ref="modal">
                                        
                                        <div className="add-item-modal">
                                            <h2>something else</h2>
                                            <button onClick={this.hideModal.bind(this)} className="close-button">Close</button>
                                        </div>
                                    </Modal> */}
                            <br />
                            <button onClick={this.hideModal.bind(this)} className="close-button">Close</button>
                        </div>
                    </Modal>
                </div>
                <div>
                    {this.renderWishListItems()}
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
