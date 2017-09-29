import React from 'react';
import { connect } from 'react-redux';
import {Router, Route} from 'react-router';

var Modal = require('boron/ScaleModal');

import './styles/WishList.css';

class WishList extends React.Component {
    //Add Item Modal 
    showModal(){ 
        this.refs.modal.show();
    }
    hideModal(){
        this.refs.modal.hide();
    }

    callback(event){
        console.log('yung');
    }



    render() {
        const wishListItems = this.props.itemData.map((item, index) =>
        <li key={index}>
            <a href="#">{item.itemName}</a>
        </li>
      );
        
        return (
            <div className="wish-list">
                <h2>Wish list</h2>
                <div>
                    <button onClick={this.showModal.bind(this)}>Add new item</button>
                        <Modal ref="modal" keyboard={this.callback}>
                            <div className="add-item-modal">
                                <h2>Add new item</h2>
                                    <input type="text"/>
                                    <button onClick={this.showModal.bind(this)}>Search</button>
                                    <Modal ref="modal" keyboard={this.callback}>
                                        <div className="add-item-modal">
                                            <h2>something else</h2>
                                            <button onClick={this.hideModal.bind(this)} className="close-button">Close</button>
                                        </div>
                                    </Modal>
                                    <br/>
                                <button onClick={this.hideModal.bind(this)} className="close-button">Close</button>
                            </div>
                        </Modal>
                </div>
                <ul>
                    {wishListItems}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        itemData: state.itemData,
        loading: state.loading
    };
};

export default connect(mapStateToProps)(WishList);
