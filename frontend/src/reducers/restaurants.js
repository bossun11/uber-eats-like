import { REQUEST_STATE } from "../constants";

const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  restaurantsList: [],
};

const restaurantsActionTypes = {
  FETCHING: "FETCHING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
};

const restaurantsReducer = (state, { type, payload }) => {
  switch (type) {
    case restaurantsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case restaurantsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        restaurantsList: payload.restaurants,
      };
    default:
      throw new Error();
  }
};

export { initialState, restaurantsActionTypes, restaurantsReducer };
