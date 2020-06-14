import React, { useState, useContext, useEffect } from "react";
import { Input, Icon, Transition } from "semantic-ui-react";
import CartContext from "../Context/CartContext";

const AddToCart = ({ menuId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [cartCount, setCartCount] = useState(0);
  const [visible, setVisible] = useState(false);
  // const { addToCart } = useContext(CartContext);

  const toggleMessage = () => {
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  };

  const validate = (quantity) => {
    let error;
    const re = /^[0-9\b]+$/;

    if (!quantity) error = "Can't be blank";
    if (!re.test(quantity)) error = "Please enter an integer for the quantity";

    return error;
  };

  const handleSubmit = async () => {
    const error = validate(quantity);

    if (!error) {
      setLoading(true);

      let currentCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      currentCartItems.push({
        menuId,
        quantity: parseInt(quantity),
      });
      localStorage.setItem("cartItems", JSON.stringify(currentCartItems));

      localStorage.setItem(
        "cartCount",
        currentCartItems.length + (quantity - 1)
      );

      setLoading(false);
      setQuantity(quantity);
      setVisible(true);
      toggleMessage();
    } else {
      setError(error || "Something went wrong");
      setLoading(false);
    }
  };

  const handleChange = ({ target: { value } }) => setQuantity(value);

  return (
    <>
      <Input
        type="number"
        placeholder="Quantity"
        value={quantity}
        min={1}
        step={1}
        error={!!error}
        onChange={handleChange}
        action={{
          color: "orange",
          content: "Add to Cart",
          icon: "plus cart",
          onClick: handleSubmit,
          loading,
          disabled: loading,
        }}
      />
      {error && (
        <div style={{ color: "red", position: "absolute" }}>{error}</div>
      )}
      <Transition duration={{ hide: 500, show: 500 }} visible={visible}>
        <div style={{ color: "green", position: "absolute" }}>
          <Icon name="check" />
          Added to cart
        </div>
      </Transition>
    </>
  );
};

export default AddToCart;
