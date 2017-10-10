
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
    return function (dispatch) {
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