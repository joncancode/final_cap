import {
    TEST_ACTION
} from '../actions';

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
    itemData: [
        {
            "itemName": "Coca-cola",
            "creator": "David",
            "price": "2",
            "upcCode": "7469962653",
            "image": "http://via.placeholder.com/300x150",
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
            "itemName": "Nintendo Switch"
        },
        {
            "itemName": "Socks"
        }
    ]
};

export const mainReducer = (state = initialState, action) => {
    if (action.type === TEST_ACTION) {
        return Object.assign({}, state, { 
            test: 'the test was updated' 
        });
    } 
    // else if (action.type === LOGIN_USER_SUCCESS) {
    //     return Object.assign({}, state, {
    //         currentUser: action.userId,
    //         loading: false // does this need to be here? update all depending on joe's response
    //     });
    // }
    return state;
};
