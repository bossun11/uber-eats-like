import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import styled from "@emotion/styled";
import { fetchRestaurants } from "../apis/restaurants";
import {
  initialState,
  restaurantsActionTypes,
  restaurantsReducer,
} from "../reducers/restaurants";
import { REQUEST_STATE } from "../constants";
import MainLogo from "../images/logo.png";
import MainCoverImage from "../images/main-cover-image.png";
import RestaurantImage from "../images/restaurant-image.jpg";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;

const RestaurantsContentsList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 150px;
`;

const RestaurantsContentWrapper = styled.div`
  width: 450px;
  padding: 48px 20px;
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;

const Restaurants = () => {
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  useEffect(() => {
    dispatch({ type: restaurantsActionTypes.FETCHING });
    fetchRestaurants().then((data) => {
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,
        payload: {
          restaurants: data.restaurants,
        },
      });
    });
  }, []);

  return (
    <>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
      <RestaurantsContentsList>
        {state.fetchState === REQUEST_STATE.LOADING ? (
          <>
            <Skeleton variant="rect" width={450} height={300} />
            <Skeleton variant="rect" width={450} height={300} />
            <Skeleton variant="rect" width={450} height={300} />
          </>
        ) : (
          state.restaurantsList.map((item) => {
            return (
              <Link
                to={`/restaurants/${item.id}/foods`}
                key={item.id}
                style={{ textDecoration: "none" }}
              >
                <RestaurantsContentWrapper>
                  <RestaurantsImageNode src={RestaurantImage} />
                  <MainText>{item.name}</MainText>
                  <SubText>{`配送料：${item.fee}円 ${item.time_required}分`}</SubText>
                </RestaurantsContentWrapper>
              </Link>
            );
          })
        )}
      </RestaurantsContentsList>
    </>
  );
};

export default Restaurants;
