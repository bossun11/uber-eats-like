import axios from "axios";
import { lineFoods } from "../urls/index";

const postLineFoods = (params) => {
  return axios
    .post(lineFoods, {
      food_id: params.foodId,
      count: params.count,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
};
