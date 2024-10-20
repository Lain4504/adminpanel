import axios from "axios";

const ORDER_BASE_URL = "http://localhost:5146/api/order";

const getAllOrders = () => {
    return axios.get(ORDER_BASE_URL + "/get-all");
};

const getOrderById = (orderId) => {
    return axios.get(ORDER_BASE_URL + "/" + orderId);
}
const getOrderDetailByOrderId = (orderId) => {
    return axios.get(ORDER_BASE_URL + "/orderdetail/" + orderId);
}
const changeShippingState = (orderId, shippingState) => {
    return axios.put(ORDER_BASE_URL + "/update-shipping/" + orderId + '/' + shippingState);
}

const changeOrderState = (orderId, orderState) => {
    return axios.put(ORDER_BASE_URL + "/update-orderState/" + orderId + '/' + orderState);
}

export { getAllOrders, getOrderById, changeShippingState, changeOrderState, getOrderDetailByOrderId };