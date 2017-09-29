import {
    TEST_ACTION
} from '../actions';

const initialState = {
    currentUser: 'SomeGuysUsername',
    loggedIn: true,
    loading: false,
    error: null,
    itemData: [
        {
            "itemName": "Coca-cola",
            "creator": "David",
            "price": "2",
            "upcCode": "7469962653",
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
            "itemName": "Nintendo Switch"
        },
        {
            "itemName": "Socks"
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
