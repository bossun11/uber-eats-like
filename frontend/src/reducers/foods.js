import { REQUEST_STATE } from "../constants";

const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  foodsList: [],
};

const foodsActionTypes = {
  FETCHING: "FETCHING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
};

const foodsReducer = (state, { type, payload }) => {
  switch (type) {
    case foodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case foodsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        foodsList: payload.foods,
      };
    default:
      throw new Error();
  }
};

export { initialState, foodsActionTypes, foodsReducer };
