
//--FetchUser------------------------------

import axios from "axios";
import { FETCH_USER } from "./types";

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

// action creator with axios
export const fetchUser = () => {
  return function(dispatch) {
    axios
      .get("/api/me", {
        headers: {
          authorization: 'Bearer ' + getCookie('accessToken')
        }
      })
      .then(res => {
     
        return dispatch({ type: FETCH_USER, payload: res.data });
      })
  };
};


//------------------------------------------




// connect socket to redux?
// socket.on('message', (message) => store.dispatch(
//     { type: 'NEW_MESSAGE', message} ));
//              SESSIONS

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const getItemsRequest = () => ({
  type: GET_ITEMS_REQUEST
});

export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const getItemsSuccess = items => ({
  type: GET_ITEMS_SUCCESS,
  items
});

export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
export const getItemsError = error => ({
  type: GET_ITEMS_ERROR,
  error
});

export const fetchItems = (username, password) => dispatch => {
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
            "itemName": "THIS IS A TEST",
            "upcCode": "73737288",
            "creator": "Pete",
            "price": "300",
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
            "itemName": "another test",
            "upcCode": "1235552323",
            "creator": "Pete",
            "price": "300",
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
            "itemName": "yet one more test",
            "upcCode": "000800808",
            "creator": "Pete",
            "price": "300",
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
        }
    ]
    dispatch(getItemsRequest());
    dispatch(getItemsSuccess(sampleData))
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