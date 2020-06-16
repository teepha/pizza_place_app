import React, { useState, useEffect } from "react";
import { getOrderHistory } from "../services/orderServices";
import OrderItemList from "../components/OrderItemList";
import Layout from "../components/Layout";
import { getLocalStorageItem } from "../utils/helpers";

const MyAccount = ({ location, history }) => {
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
    };
    getOrders();
  }, [history]);

  return (
    <Layout location={location}>
      <OrderItemList orders={orders} loading={loading} />
    </Layout>
  );
};
export default MyAccount;
