import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Icon, Transition } from "semantic-ui-react";
import { getLocalStorageItem } from "../../utils/helpers";

const AddToCart = ({ menuId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [visible, setVisible] = useState(false);
  let history = useHistory();

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
    const token = getLocalStorageItem("customerToken");
    if (!token) {
      return history.push("/login/");
    }

    if (!error) {
      setLoading(true);

      let cartMenuIds = JSON.parse(localStorage.getItem("menuIds")) || [];
      let currentCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

      const itemIndex = currentCartItems.findIndex(
        (item) => item.id === menuId
      );

      if (cartMenuIds.length && itemIndex > -1) {
        let currentQuantity =
          parseInt(currentCartItems[itemIndex].quantity) + parseInt(quantity);
        currentCartItems.splice(itemIndex, 1);
        currentCartItems.push({ id: menuId, quantity: currentQuantity });
        localStorage.setItem("cartItems", JSON.stringify(currentCartItems));
      } else {
        cartMenuIds.push(menuId);
        localStorage.setItem("menuIds", JSON.stringify(cartMenuIds));
        currentCartItems.push({ id: menuId, quantity: parseInt(quantity) });
        localStorage.setItem("cartItems", JSON.stringify(currentCartItems));
      }

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
