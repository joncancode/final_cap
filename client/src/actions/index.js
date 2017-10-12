

//--FetchUser------------------------------

import axios from "axios";
import { FETCH_USER } from "./types";

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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
    console.log('fetching user inside actions :/')
    return function (dispatch) {
        axios
            .get("/api/me", {
                headers: {
                    Authorization: 'Bearer ' + getCookie('accessToken')
                }
            })
            .then(res => {
                console.log('res is: ', res)
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

export const fetchItems = accessToken => dispatch => {

    dispatch(getItemsRequest());
    return fetch('/api/items/', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(items => {

            // console.log('THIS IS ITEMS RETURNING FROM GET ITEM SUCCESS', items);
            return dispatch(getItemsSuccess(items));
        })
        .catch(err => {
            dispatch(getItemsError(err));
        });
};

export const POST_ITEMS_REQUEST = 'POST_ITEMS_REQUEST';
export const postItemsRequest = () => ({
    type: POST_ITEMS_REQUEST
});

export const POST_ITEMS_SUCCESS = 'POST_ITEMS_SUCCESS';
export const postItemsSuccess = item => ({
    type: POST_ITEMS_SUCCESS,
    item
});

export const POST_ITEMS_ERROR = 'POST_ITEMS_ERROR';
export const postItemsError = error => ({
    type: POST_ITEMS_ERROR,
    error
});

//POST ITEM
export const postItems = input => dispatch => {
    let formattedPostRequest = {
        title: input.title,
        currency: input.currency,
        upc: input.upc,
        creator: input.creator
    }
    console.log('INPUT IN POST ITEMS.....', input);
    // console.log('FORMATTED POST REQUESET', formattedPostRequest)

    const opts = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            //   Authorization: `Basic ${window.encodedAuthHeader}`
        },
        method: 'POST',
        body: JSON.stringify(formattedPostRequest)
    };

    dispatch(postItemsRequest())
    // return dispatch => {

    fetch('/api/item', opts)
        .then(function (res) {
            // console.log(res, 'RES FROM API ITEMS POST DISPATCH')
            dispatch(postItemsSuccess(res))
        })
        .catch(err => {
            // console.log('POST ITEMS  ERROR')
            dispatch(postItemsError(err));
        });

}






//API REQUEST
export const GET_API_REQUEST = 'GET_API_REQUEST';
export const getApiRequest = () => ({
    type: GET_API_REQUEST
});

export const GET_API_SUCCESS = 'GET_API_SUCCESS';
export const getApiSuccess = items => ({
    type: GET_API_SUCCESS,
    items
});

export const GET_API_ERROR = 'GET_API_ERROR';
export const getApiError = error => ({
    type: GET_API_ERROR,
    error
});

export const fetchApiItems = accessToken => dispatch => {
    // let query = 099923418528;
    console.log('FETCH ITEMS')
    // fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc=099923418528`)
    dispatch(getApiRequest());
    return fetch('https://api.upcitemdb.com/prod/trial/search?s=apple&match_mode=0&type=product'
        ,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(items => {


            console.log('SUCCESS FROM GETAPISUCCESS', items);
            // console.log('THIS IS ITEMS RETURNING FROM GET ITEM SUCCESS', items);
            return dispatch(getApiSuccess(items));
        })
        .catch(err => {
            dispatch(getApiError(err));
        });
};