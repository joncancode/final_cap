import React from 'react';
import { connect } from 'react-redux';
import {Router, Route} from 'react-router';

var Modal = require('boron/DropModal');

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
                    <button onClick={this.showModal.bind(this)}>Open</button>
                        <Modal ref="modal" keyboard={this.callback}>
                            <h2>I am a dialog</h2>
                            <button onClick={this.hideModal.bind(this)}>Close</button>
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
