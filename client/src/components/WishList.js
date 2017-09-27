import React from 'react';
import { connect } from 'react-redux';

import './styles/WishList.css';

class WishList extends React.Component {
    
    render() {
        const wishListItems = this.props.itemData.map((item, index) =>
        <li>
            <a href="#">{item.itemName}</a>
        </li>
      );
        
        return (
            <div className="wish-list">
                <h2>Wish list</h2>
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
