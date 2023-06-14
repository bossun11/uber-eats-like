const DEFAULT_API_LOCALHOST = "http://localhost:3000/api/v1";

const restaurantsIndex = `${DEFAULT_API_LOCALHOST}/restaurants`;
const foodsIndex = (restaurantId) =>
  `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`;
const lineFoods = `${DEFAULT_API_LOCALHOST}/line_foods`;
const lineFoodsReplace = `${DEFAULT_API_LOCALHOST}/line_foods/replace`;
const orders = `${DEFAULT_API_LOCALHOST}/orders`;

export { restaurantsIndex, foodsIndex, lineFoods, lineFoodsReplace, orders };
