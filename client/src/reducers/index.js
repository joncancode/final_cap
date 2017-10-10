import actions from '../actions';
import { FETCH_USER } from "../actions/types";

const initialState = {
    currentUser: null,
    loggedIn: false,
    loading: false,
    error: null,
    activeItem: null,
    itemData: null
};

export const mainReducer = (state = initialState, action) => {

    switch(action.type) {
    //GET USER SUBMITTED ITEMS
        case 'GET_ITEMS_REQUEST': {
            return Object.assign({}, state, {
                loading: true,
                error: null
              });
        }
        case 'GET_ITEMS_SUCCESS': {
            // console.log('LOLOLOL')
            return Object.assign({}, state, {
                itemData: action.items, 
                // activeItem: action.result,
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

    //API REQUESTS
        case 'GET_API_REQUEST': {
            return Object.assign({}, state, {
                loading: true,
                error: null
              });
        }
        case 'GET_API_SUCCESS': {
            // console.log('LOLOLOL')
            return Object.assign({}, state, {
                apiData: action.items, 
                // activeItem: action.result,
                loading: false,
                error: null
            });
        }
        case 'GET_API_ERROR': {
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

