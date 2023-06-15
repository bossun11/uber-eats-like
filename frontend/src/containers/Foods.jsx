import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFoods } from "../apis/foods";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Skeleton from "@mui/material/Skeleton";
import FoodWrapper from "../components/FoodWrapper";
import {
  initialState as foodsInitialState,
  foodsActionTypes,
  foodsReducer,
} from "../reducers/foods";
import { REQUEST_STATE } from "../constants";
import { COLORS } from "../style_constants";
import { LocalMallIcon } from "../components/Icons";
import MainLogo from "../images/logo.png";
import FoodImage from "../images/food-image.jpg";
import FoodOrderDialog from "../components/FoodOrderDialog";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

const Foods = () => {
  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
  };
  const { restaurantsId } = useParams();
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  const [state, setState] = useState(initialState);

  const onClickFoodWrapper = (food) => {
    setState({
      ...state,
      isOpenOrderDialog: true,
      selectedFood: food,
    });
  };

  const onCloseDialog = () => {
    setState({
      ...state,
      isOpenOrderDialog: false,
      selectedFood: null,
      selectedFoodCount: 1,
    });
  };

  const onClickCountUp = () => {
    console.log("カウントアップボタンが押された！");
    setState({
      ...state,
      selectedFoodCount: state.selectedFoodCount + 1,
    });
  };

  const onClickCountDown = () => {
    setState({
      ...state,
      selectedFoodCount: state.selectedFoodCount - 1,
    });
  };

  const submitOrder = (food) => {};

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
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/order">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {foodsState.fetchState === REQUEST_STATE.LOADING ? (
          <>
            {[...Array(12).keys()].map((i) => {
              return (
                <ItemWrapper key={i}>
                  <Skeleton key={i} variant="rect" width={450} height={180} />
                </ItemWrapper>
              );
            })}
          </>
        ) : (
          foodsState.foodsList.map((food) => (
            <ItemWrapper key={food.id}>
              <FoodWrapper
                food={food}
                onClickFoodWrapper={onClickFoodWrapper}
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
      {state.isOpenOrderDialog && (
        <FoodOrderDialog
          food={state.selectedFood}
          isOpen={state.isOpenOrderDialog}
          onCloseDialog={onCloseDialog}
          countNumber={state.selectedFoodCount}
          onClickCountUp={onClickCountUp}
          onClickCountDown={onClickCountDown}
          onClickOrder={() => submitOrder()}
        />
      )}
    </>
  );
};

export default Foods;
