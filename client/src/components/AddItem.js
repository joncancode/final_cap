import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';

// import { fetchApiItems } from '../actions/';

import './styles/AddItem.css';



class AddItem extends React.Component {
    // componentDidMount() {
    //     this.props.dispatch(fetchApiItems());
    // }

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hideModal() {
        this.refs.modal.hide();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }



    render() {
        return (
            <div className="add-item">
                <h2>Add new item</h2>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Test:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
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
