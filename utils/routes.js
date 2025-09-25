// const dev = "http://192.168.100.4:4000";
const prod = "https://food-stall-management-system-backend.onrender.com";

const baseUrl = prod;

export const routes = {
  login: baseUrl + "/users/login",
  userInfo: baseUrl + "/users/cookie",
  stats: baseUrl + "/stats/bm",
  getMeals: baseUrl + "/meals",
  addMeal: baseUrl + "/meals/add",
};
