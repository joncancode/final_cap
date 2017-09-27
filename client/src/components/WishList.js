import React from 'react';

import './styles/WishList.css';

class WishList extends React.Component {
    

    render() {
        return (
            <div className="wish-list">
                <h2>Wish list</h2>
                <ul>
                    <li>Coke</li>
                    <li>Switch</li>
                    <li>Socks</li>
                </ul>
            </div>
        )
    }
}

export default WishList;
