import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './styles/AddItemModal.css';

class AddItemModal extends React.Component {
    
    render() {
        if(!this.props.show) {
                return null;
            }
        
        return (
            <div className="add-item-modal-backdrop">
                <div className="add-item-modal">
                    <p className="test">test</p>
                    <div className="footer">
                        <button onClick={this.props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


AddItemModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool
};
  
export default AddItemModal;
