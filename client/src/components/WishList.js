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
            // console.log('ITEM DATA FROM RENDERIWISHLIST ITEMS', this.props.itemData.items)
            //MAP FUNCTION
            const itemResults = this.props.itemData.items.map((item, index) => (


                <li key={index}>
                    <Link to={`/Home/${item.upc}`}>
                        {item.title}
                    </Link>
                </li>
            ));
            return (

                <ul>
                    {itemResults}
                </ul>

            )

            //ALT HARDCODED SINGLEITEM

            // const item = this.props.itemData.items[0];
            // console.log('ITEM DATA FROM ALTERNATE', item)

            // return (
            //     <BrowserRouter history={BrowserHistory}>
            //         <ul>
            //             <li>
            //                 <Link to={`/Home/${item.upc}`}>
            //                     {item.title}
            //                 </Link>
            //             </li>
            //         </ul>
            //     </BrowserRouter>
            // )
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
                    <ul>
                        {this.renderWishListItems()}
                        {/* {this.props.itemData.items.map((item, index) => (
                            <li>
                                <Link to={`/Home/${item.upc}`}>
                                    {item.title}
                                </Link>
                            </li>))} */}
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
