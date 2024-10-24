import axios from "axios";

const ORDER_API = import.meta.env.VITE_API_URL + "/order";

const getAllOrders = () => {
    return axios.get(`${ORDER_API}/get-all`);
};

const getOrderById = (orderId) => {
    return axios.get(`${ORDER_API}/${orderId}`);
};

const getOrderDetailByOrderId = (orderId) => {
    return axios.get(`${ORDER_API}/orderdetail/${orderId}`);
};

const changeShippingState = (orderId, shippingState) => {
    return axios.put(`${ORDER_API}/update-shipping/${orderId}/${shippingState}`);
};

const changeOrderState = (orderId, orderState) => {
    return axios.put(`${ORDER_API}/update-orderState/${orderId}/${orderState}`);
};

export { getAllOrders, getOrderById, changeShippingState, changeOrderState, getOrderDetailByOrderId };
