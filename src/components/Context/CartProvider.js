import React, { useState, useEffect } from "react";
import CartContext from "./CartContext";
import AuthProvider from "./AuthProvider";
import { setLocalStorageItem, getLocalStorageItem } from "../../utils/helpers";

const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (quantity, cartId) => {
    const cartCountResult = Number(cartCount) + Number(quantity);
    setLocalStorageItem(
      "mdata",
      JSON.stringify({ cartId, cartCount: cartCountResult })
    );
    setCartCount(cartCountResult);
  };

  const updateCartCount = (cartCount, cartId) => {
    setLocalStorageItem("mdata", JSON.stringify({ cartId, cartCount }));
    setCartCount(cartCount);
  };

  useEffect(() => {
    const cartId = getLocalStorageItem("mcart");

    const mdata = getLocalStorageItem("mdata");

    if ((cartId && !mdata) || !cartId) {
      const cartId = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, () =>
        // eslint-disable-next-line no-bitwise
        ((Math.random() * 16) | 0).toString(16)
      );
      setLocalStorageItem("mcart", cartId);
      setLocalStorageItem("mdata", JSON.stringify({ cartId, cartCount: 0 }));
      setCartId(cartId);
    } else {
      const data = getLocalStorageItem("mdata");
      const parsedData = JSON.parse(data);
      setCartCount(parsedData.cartCount || 0);
    }
  }, []);

  return (
    <AuthProvider>
      <CartContext.Provider
        value={{
          cartId,
          cartCount,
          addToCart,
          updateCartCount,
        }}
      >
        {children}
      </CartContext.Provider>
    </AuthProvider>
  );
};

export default CartProvider;
