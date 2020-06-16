import { BASEURL, getLocalStorageItem } from "../utils/helpers";

const getOrderHistory = async () => {
  return fetch(`${BASEURL}/api/v1/orders/history`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: getLocalStorageItem("customerToken"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.orders.orders;
    })
    .catch((error) => {
      return error;
    });
};

const getOrderItems = async (id) => {
  return fetch(`${BASEURL}/api/v1/orders/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: getLocalStorageItem("customerToken"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.order.order;
    })
    .catch((error) => {
      return error;
    });
};

const createOrder = async (data) =>
  fetch(`${BASEURL}/api/v1/orders`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: getLocalStorageItem("customerToken"),
    },
    body: JSON.stringify({
      ...data,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.message;
    })
    .catch((error) => {
      return error;
    });

export { getOrderHistory, getOrderItems, createOrder };
