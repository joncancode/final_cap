import actions from '../actions';
import { FETCH_USER } from "../actions/types";

const initialState = {
    currentUser: null,
    loggedIn: false,
    loading: false,
    error: null,
    activeItem: null,
    itemData: [
        {
            // "itemName": 'testItem',
            // "creator": 'testGuy',
            // "price": '100',
            // "upcCode": '1',
            // "image": "http://via.placeholder.com/301x150",
            // "stores": [
            //     {
            //         "name": "Target",
            //         "inventory": "not in stock"
            //     },
            //     {
            //         "name": "Apple store",
            //         "inventory": "last seen by Ralph"
            //     },
            //     {
            //         "name": "Best Buy",
            //         "inventory": "last seen by Hernicio"
            //     }
            // ]
        }
    ]
};

export const mainReducer = (state = initialState, action) => {

    switch(action.type) {
        case 'GET_ITEMS_REQUEST': {
            return Object.assign({}, state, {
                loading: true,
                error: null
              });
        }
        case 'GET_ITEMS_SUCCESS': {
            return Object.assign({}, state, {
                itemData: action.items, 
                activeItem: action.result,
                loading: false,
                error: null
            });
        }
        case 'GET_ITEMS_ERROR': {
            return Object.assign({}, state, {
                error: action.error,
                loading: false
            });
        }
        case 'FETCH_USER': {
            console.log('----------->action: ', action.payload);
            return action.payload || false; // need to update state here, object.assign or ...spread, return {...state, user:true}
        }
        default : return state;
    } 
};


// import { combineReducers } from "redux";
// import authReducer from "./authReducer";

// const rootReducer = combineReducers ({
//   auth: authReducer
// });

// export default rootReducer;

