import axios from "axios";
import { FETCH_USER } from "./types";

// action creator with axios
export const fetchUser = () => {
  return function(dispatch) {
    axios
      .get("/api/current_user")
      .then(res => {
     
        return dispatch({ type: FETCH_USER, payload: res.data });
      })
  };
};

// react component calls an action, action creator returns an action which is sent to the dispatch function which sends the action to all the different reducers in the store, causing them to instantly recalculate/rerender the app state.





// export const TEST_ACTION = 'TEST_ACTION';
// export const testAction = () => ({
//     type: TEST_ACTION
// });
