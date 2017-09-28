import React from 'react';
import { connect } from 'react-redux';
import {Router, Route} from 'react-router';

import AddItemModal from './AddItemModal';

import './styles/WishList.css';

class WishList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
      }
    
      toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
        const wishListItems = this.props.itemData.map((item, index) =>
        <li>
            <a href="#">{item.itemName}</a>
        </li>
      );
        
        return (
            <div className="wish-list">
                <h2>Wish list</h2>
                <button onClick={this.toggleModal}>
                    Add item
                </button>
                <AddItemModal show={this.state.isOpen}
                    onClose={this.toggleModal}>
                </AddItemModal>
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
