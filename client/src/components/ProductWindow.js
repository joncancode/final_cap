import React from 'react';

import './styles/ProductWindow.css';

import { connect } from 'react-redux';

class ProductWindow extends React.Component {
    render() {
        const currentItem = this.props.itemData[0];
        console.log(this.props)
        return (
            <div className="product-window">
                <div className="item-overview">
                    <h2>{currentItem.itemName}</h2>
                    <p>Added by {currentItem.creator}</p>
                    <img src="http://via.placeholder.com/350x150"/>
                </div>
                <div className="item-info">
                    <table>
                        <tr>
                            <th>Price</th>
                            <th>${currentItem.price}</th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>UPC Code</th>
                            <th>{currentItem.upcCode}</th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>Store 1</th>
                            <th>{currentItem.stores[0].name}</th>
                            <th>{currentItem.stores[0].inventory}</th>
                        </tr>
                        <tr>
                            <th>Store 2</th>
                            <th>Gas station on Main St</th>
                            <th>Last seen by Dan</th>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser,
        itemData: state.itemData,
        loading: state.loading
    };
};

export default connect(mapStateToProps)(ProductWindow);
