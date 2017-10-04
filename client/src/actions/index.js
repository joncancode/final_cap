// import * as Cookies from 'js-cookie';

export const TEST_ACTION = 'TEST_ACTION';
export const testAction = () => ({
    type: TEST_ACTION
});


// connect socket to redux?
// socket.on('message', (message) => store.dispatch(
//     { type: 'NEW_MESSAGE', message} ));
//              SESSIONS

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const getItemsRequest = () => ({
  type: GET_ITEMS_REQUEST
});

export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const getItemsSuccess = (items, result) => ({
  type: GET_ITEMS_SUCCESS,
  items,
  result
});

export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
export const getItemsError = error => ({
  type: GET_ITEMS_ERROR,
  error
});

export const fetchItems = (id) => dispatch => {
    // const credentials = `${username}:${password}`;
    // const encodedAuthHeader = btoa(credentials);
    // const authString = `Basic ${encodedAuthHeader}`;
  
    // const opts = {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     Authorization: authString
    //   },
    //   method: 'GET'
    // };

    const sampleData =  [
        {
            "itemName": "THIS IS A TEST1",
            "upcCode": "73737288",
            "creator": "Pete1",
            "price": "3001",
            "image": "http://via.placeholder.com/301x150",
            "stores": [
                {
                    "name": "Target1",
                    "inventory": "not in stock"
                },
                {
                    "name": "Walmart1",
                    "inventory": "last seen by Dan"
                },
                {
                    "name": "CVS Pharmacy1",
                    "inventory": "not in stock"
                }
            ]
        },
        {
            "itemName": "another test2",
            "upcCode": "1235552323",
            "creator": "Pete2",
            "price": "3002",
            "image": "http://via.placeholder.com/301x150",
            "stores": [
                {
                    "name": "Target2",
                    "inventory": "not in stock2"
                },
                {
                    "name": "Walmar2",
                    "inventory": "last seen by Da2n"
                },
                {
                    "name": "CVS Pharmacy2",
                    "inventory": "not in stock2"
                }
            ]
        },
        {
            "itemName": "yet one more test3",
            "upcCode": "000800808",
            "creator": "Pete3",
            "price": "3",
            "image": "http://via.placeholder.com/301x150",
            "stores": [
                {
                    "name": "Target3",
                    "inventory": "not in stock3"
                },
                {
                    "name": "Walmart3",
                    "inventory": "last seen by Dan3"
                },
                {
                    "name": "CVS Pharmacy3",
                    "inventory": "not in stock3"
                }
            ]
        }
    ]
    const result = sampleData.find(x => x.upcCode === id)
    // console.log('RESULT', result)

    dispatch(getItemsRequest());
    dispatch(getItemsSuccess(sampleData, result))
    // return fetch('/api/sessions/', opts)
    // return(sampleData)
    //     console.log('dispatch') 
    //   .then(res => {
    //     if (!res.ok) {
    //       return Promise.reject(res.statusText);
    //     }
    //     return res.json();
    //   })
    //   .then(items => {
        
        
    //     console.log('THIS IS ITEMS', items);        
    //     return dispatch(getItemsSuccess(items));
    //   })
    //   .catch(err => {
    //     dispatch(getItemsError(err));
    //   });
  };