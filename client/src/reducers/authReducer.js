import { FETCH_USER } from "../actions/types";
const initialState = { 
    currentUser: null, 
    userId: null,
  }
export default function(state = {}, action) {
//   console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // need to update state here, object.assign or ...spread, return {...state, user:true}
      
    default:
      return state;
  }
}
