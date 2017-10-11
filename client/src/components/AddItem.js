import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';

import { fetchApiItems } from '../actions/';

import './styles/AddItem.css';



class AddItem extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchApiItems());
    }
    
    hideModal() {
        this.refs.modal.hide();
    }
    
    render() {
        return (
            <div className="add-item">
                <h2>Add new item</h2>
                <input type="text" />
                <button>Search</button>
                <br />
                <button onClick={this.hideModal.bind(this)} className="close-button">Close</button>
            </div>
        );
    }

}
const mapStateToProps = function (state) {
    return {
        loggedIn: state.loggedIn,
        itemData: state.itemData,
        activeItem: state.activeItem
    };
};

export default connect(mapStateToProps)(AddItem);
