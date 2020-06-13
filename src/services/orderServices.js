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

export { getOrderHistory };
