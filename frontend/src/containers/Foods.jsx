import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { fetchFoods } from "../apis/foods";
import {
  initialState as foodsInitialState,
  foodsActionTypes,
  foodsReducer,
} from "../reducers/foods";
import { REQUEST_STATE } from "../constants";

const Foods = () => {
  const { restaurantsId } = useParams();
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(restaurantsId).then((data) => {
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload: {
          foods: data.foods,
        },
      });
    });
  }, []);
  return (
    <>
      {foodsState.fetchState === REQUEST_STATE.LOADING ? (
        <p>ロード中...</p>
      ) : (
        foodsState.foodsList.map((food) => <div key={food.id}>{food.name}</div>)
      )}
    </>
  );
};

export default Foods;
