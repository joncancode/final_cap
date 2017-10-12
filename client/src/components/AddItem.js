import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';

import { postItems } from '../actions/';

import './styles/AddItem.css';



class AddItem extends React.Component {
    // componentDidMount() {
    //     this.props.dispatch(fetchApiItems());
    // }

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            currency: '',
            upc: '',
            creator: ''
        };
        // upc: req.body.upc,
        // creator: req.body.creator,
        // stores: req.body.stores,
        // user_data: req.body.user_data,
        // images: req.body.images

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hideModal() {
        this.refs.modal.hide();
    }

    handleChange(event) {
        this.setState({ title: event.target.value,
        currency:event.target.value,
        upc: event.target.value,
        creator: event.target.value
    });
    }

    handleSubmit(event) {
        event.preventDefault();
        // const userInput = this.state;
        console.log('inputted value----' + this.state);
        this.props.dispatch(postItems(this.state));
        //ACTION FOR SUBMIT
    }

    render() {
        return (
            <div className="add-item">
                <h2>Add new item</h2>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input type="text" title={this.state.title} onChange={this.handleChange} />
                    </label>
                    <label>
                        Currency:
                        <input type="text" title={this.state.currency} onChange={this.handleChange} />
                    </label>
                    <label>
                        UPC:
                        <input type="text" title={this.state.upc} onChange={this.handleChange} />
                    </label>
                    <label>
                        Creator:
                        <input type="text" title={this.state.creator} onChange={this.handleChange} />
                    </label>
                    <button type="submit">Search</button>
                </form>

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
