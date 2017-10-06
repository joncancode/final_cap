import React from 'react';
import { connect } from 'react-redux';
import { BrowserHistory, BrowserRouter, Link, Router, Route } from 'react-router-dom';

import { fetchItems } from '../actions/';


import MainWindow from './MainWindow';

const Modal = require('boron/ScaleModal');

import './styles/WishList.css';

class WishList extends React.Component {
    componentDidMount() {

        this.props.dispatch(fetchItems());
    }

    //Add Item Modal 
    showModal() {
        this.refs.modal.show();
    }
    hideModal() {
        this.refs.modal.hide();
    }
    renderWishListItems() {
        // console.log(this.props.itemData, 'RENDER WISH LIST ITEMS')
        // if (this.props.loading) {
        //     // return <Spinner spinnerName="circle" noFadeIn />;

        //     console.log('LOADING');
        //     return <li>loading items...</li>;
        // }
        // if (this.props.error) {
        //     return (
        //         <strong>
        //             {this.props.error}
        //         </strong>
        //     );
        // }
        if (this.props.itemData) {
            console.log('YES THERE ARE ITEM DATA', this.props.itemData)
            const wishListItems = this.props.itemData.map((item, index) =>
                <Link to={`/items/${item.upcCode}`}>
                    <li key={index}>
                        {item.itemName}
                    </li>
                </Link>
            );
        }
        else {
            return (

                <li>nothing yet</li>

            )
        }


    }

    render() {


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
                <BrowserRouter history={BrowserHistory}>
                <ul>
                    {this.renderWishListItems()}
                    {/* <li>hi</li> */}
                </ul>
                </BrowserRouter>
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
