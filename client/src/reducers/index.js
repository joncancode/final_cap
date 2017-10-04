import {
    TEST_ACTION,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_ERROR
} from '../actions';

const initialState = {
    currentUser: 'SomeGuysUsername',
    // loggedIn: false,
    loggedIn: true,
    loading: false,
    error: null,
    currentItem: null,

    itemData: [
        {
            "itemName": "Coca-cola",
            "creator": "David",
            "price": "2",
            "upcCode": "73737288",
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
            "upcCode": "1235552323",
        },
        {
            "itemName": "Socks",
            "upcCode": "000800808",
        }
    ]
};

export const mainReducer = (state = initialState, action) => {
    //do switch statements
    if (action.type === TEST_ACTION) {
        return Object.assign({}, state, { 
            test: 'the test was updated' 
        });
    }  else if (action.type === GET_ITEMS_REQUEST) {
        return Object.assign({}, state, {
          loading: true,
          error: null
        });
      } else if (action.type === GET_ITEMS_SUCCESS) {
          const fakecurrentItem= 1;
        return Object.assign({}, state, {
          itemData: action.items,
          loading: false,
          currentItem: fakecurrentItem,
          error: null
        });
      } else if (action.type === GET_ITEMS_ERROR) {
        return Object.assign({}, state, {
          error: action.error,
          loading: false
        });
      }
    return state;
};


import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers ({
  auth: authReducer
});

export default rootReducer;

