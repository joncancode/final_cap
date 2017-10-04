import { FETCH_USER } from "../actions/types";
// const initialState = { 
//     currentUser: null, 
//     userId: null,
//   }
export default function(state = {}, action) {

  switch (action.type) {
    case FETCH_USER:
    console.log('----------->action: ', action.payload);
      return action.payload || false; // need to update state here, object.assign or ...spread, return {...state, user:true}
      
    default:
      return state;
  }
}
