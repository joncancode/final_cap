import actions from '../actions';

const initialState = {
    currentUser: null,
    loggedIn: false,
    loading: false,
    error: null,
    activeItem: null,
    itemData: [
        {
            "itemName": null,
            "creator": null,
            "price": null,
            "upcCode": null,
            "image": null,
            "stores": []
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
        default : return state;
    } 
};