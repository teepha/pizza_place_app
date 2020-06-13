import React, { useState, useEffect, useContext } from "react";
import { getOrderHistory } from "../services/orderServices";
// import OrderItemList from "../components/OrderItemList";
import Layout from "../components/Layout";
import AuthContext from "../components/Context/AuthContext";
import { getLocalStorageItem } from "../utils/helpers";

const MyAccount = ({ location, history }) => {
  console.log("myacccc", location);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = getLocalStorageItem("customerToken");
    if (!token) {
      history.push("/login/");
    }
    const getOrders = async () => {
      const orderHistory = await getOrderHistory();
      setOrders(orderHistory);
      setLoading(false);
      console.log("HOrders", orders, "Hiiiisdfsdfds", orderHistory);
    };
    getOrders();
  }, []);

  return (
    <Layout location={location}>
      {/**<OrderItemList
        orders={orders}
        loading={loading}
      />*/}
      <p>Your orders are here!</p>
    </Layout>
  );
};
export default MyAccount;
