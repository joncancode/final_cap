import React from 'react';

import './styles/WishList.css';

class WishList extends React.Component {
    

    render() {
        return (
            <div className="wish-list">
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
