/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import CartItemList from "../components/CartItemList";
// import CartSummary from "../components/CartSummary";
import Layout from "../components/Layout";
import { cartMenuItems } from "../services/menuServices";

const Cart = ({ location, history }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [itemToRemove, setItemToRemove] = useState();
  const token = localStorage.getItem("customerToken");

  if (!token) {
    history.push("/login/");
  }

  const getCart = async (cartItemsIds) => {
    if (cartItemsIds.length) {
      const cartData = await cartMenuItems(cartItemsIds);
      setLoading(false);
      setItems(cartData);
    }
  };

  useEffect(() => {
    const parsedCartItemsIds = localStorage.menuIds
      ? JSON.parse(localStorage.getItem("menuIds"))
      : [];

    getCart(parsedCartItemsIds);

    if (items.length && !parsedCartItemsIds.length) {
      setItems([]);
    }
  }, [items.length]);

  useEffect(() => {
    if (itemToRemove) {
      const truncatedItems = items.filter((item) => item.id !== itemToRemove);
      setItems(truncatedItems);
      setItemToRemove(null);
    }
  }, [itemToRemove, items]);

  const handleRemoveFromCart = (itemId) => {
    const currentCartItems = JSON.parse(localStorage.getItem("cartItems"));
    let cartMenuIds = JSON.parse(localStorage.getItem("menuIds"));
    let index = currentCartItems.findIndex((item) => item.id === itemId);
    currentCartItems.splice(index, 1);
    cartMenuIds.splice(index, 1);

    localStorage.setItem("cartItems", JSON.stringify(currentCartItems));
    localStorage.setItem("menuIds", JSON.stringify(cartMenuIds));

    setItemToRemove(itemId);
  };

  const rest = { items, loading };

  return (
    <Layout location={location}>
      <CartItemList
        {...rest}
        removeFromCart={(item) => handleRemoveFromCart(item)}
      />
    </Layout>
  );
};

export default Cart;
