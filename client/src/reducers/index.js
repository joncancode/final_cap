/*

import {
    TEST_ACTION
} from '../actions';

const initialState = {
    currentUser: 'SomeGuysUsername',
    // loggedIn: false,
    loggedIn: true,
    loading: false,
    error: null,
    itemData: [
        {
            "itemName": "Coca-cola",
            "creator": "David",
            "price": "2",
            "upcCode": "1",
            "image": "http://via.placeholder.com/301x150",
            "stores": [
                {
                    "name": "Target",
                    "inventory": "not in stock"
                },
                {
                    "name": "Walmart",
                    "inventory": "last seen by Dan"
                },
                {
                    "name": "CVS Pharmacy",
                    "inventory": "not in stock"
                }
            ]
        },
        {
            "itemName": "Nintendo Switch",
            "upcCode": "2",
        },
        {
            "itemName": "Socks",
            "upcCode": "3",
        }
    ]
};

export const mainReducer = (state = initialState, action) => {
    //do switch statements
    if (action.type === TEST_ACTION) {
        return Object.assign({}, state, { 
            test: 'the test was updated' 
        });
    } 
    return state;
};
*/

import { combineReducers } from "redux";
import authReducer from "./authReducer";
const rootReducer = combineReducers ({
  auth: authReducer
});

export default rootReducer;