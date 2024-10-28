import axios from "axios";

const CHART_API = import.meta.env.VITE_API_URL + "/chart"; 

const getSalesData = () => {
  return axios.get(`${CHART_API}/total-products-sold-last-7-days`);
};

const getEarningsData = () => {
  return axios.get(`${CHART_API}/total-revenue-last-7-days`);
};

const getOrdersData = () => {
  return axios.get(`${CHART_API}/total-orders-last-7-days`);
};

const getUsersData = () => {
  return axios.get(`${CHART_API}/new-users-count-last-7-days`);
};

const getRevenueData = () => {
  return axios.get(`${CHART_API}/revenue-last-14-days`);
};

const getTopSellingProducts = (page = 1, pageSize = 10) => {
  return axios.get(`${CHART_API}/best-selling-products-last-7-days?page=${page}&pageSize=${pageSize}`);
};

export {
  getSalesData,
  getEarningsData,
  getOrdersData,
  getUsersData,
  getRevenueData,
  getTopSellingProducts
};
