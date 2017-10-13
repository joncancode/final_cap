import React from 'react';
import { connect } from 'react-redux';
import {Link, Router} from 'react-router-dom';



class Test extends React.Component {



    render() {

        
        return (
            <div className="product-window">
                <h2>Test</h2>
                <div>
                    <p>test</p>
                </div>
    
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

export default connect(mapStateToProps)(Test);
