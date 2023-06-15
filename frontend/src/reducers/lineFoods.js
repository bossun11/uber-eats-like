import { REQUEST_STATE } from "../constants";

const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  postState: REQUEST_STATE.INITIAL,
  lineFoodsSummary: null,
};

const lineFoodsActionTypes = {
  FETCHING: "FETCHING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  POSTING: "POSTING",
  POST_SUCCESS: "POST_SUCCESS",
};

const lineFoodsReducer = (state, { type, payload }) => {
  switch (type) {
    case lineFoodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case lineFoodsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        lineFoodsSummary: payload.lineFoodsSummary,
      };
    case lineFoodsActionTypes.POSTING:
      return {
        ...state,
        postState: REQUEST_STATE.LOADING,
      };
    case lineFoodsActionTypes.POST_SUCCESS:
      return {
        ...state,
        postState: REQUEST_STATE.OK,
      };
    default:
      throw new Error();
  }
};

export { initialState, lineFoodsActionTypes, lineFoodsReducer };
