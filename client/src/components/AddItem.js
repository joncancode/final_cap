import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';

import { postItems } from '../actions/';

import './styles/AddItem.css';



class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleChange(event) {
        this.setState({
            title: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event, 'handleSubmit EVENT....')
        // const userInput = this.state;
        console.log('inputted value----', this.state);
        this.props.dispatch(postItems(this.state));
        //ACTION FOR SUBMIT
    }

    render() {
        return (
            <div className="add-item">
                <h2>Add new item</h2>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" title={this.state.title} onChange={this.handleChange} />
                    <button type="submit">Search</button>
                </form>
                {/* <button onClick={this.hideModal.bind(this)} className="close-button">Close</button> */}
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
