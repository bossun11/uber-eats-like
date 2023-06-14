import { useEffect, useReducer } from "react";
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
                onClickFoodWrapper={(food) => console.log(food)}
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
    </>
  );
};

export default Foods;
