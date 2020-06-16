/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";
import { Item, Button, Message, Responsive, Loader } from "semantic-ui-react";
import PizzaImage from "../../styles/images/bbq-beef.png";
import { capitalize } from "../../utils/helpers";
import CartSummary from "../CartSummary";

export default ({ items, loading, removeFromCart }) => {
  if (loading) return <Loader active inline="centered" />;
  if (items.length === 0)
    return (
      <Message warning>
        <Message.Header>Your cart is empty</Message.Header>
        <p>
          You will need to add some items to the cart before you can checkout.
        </p>
      </Message>
    );

  let totalPrice = 0;
  const mapCartItemsToItems = (items) =>
    items.map(({ id, price, name, description }) => {
      const cartItemsQuantity = JSON.parse(localStorage.getItem("cartItems"));
      const itemQuantity = cartItemsQuantity.find(
        (cartItem) => cartItem.id === id
      );
      let quantity = itemQuantity && itemQuantity.quantity;
      let subTotal = quantity * price;
      totalPrice += subTotal;

      const DesktopItemImage = () => (
        <Item.Image
          src={PizzaImage}
          alt={name}
          size="small"
          style={{ background: "#f2f2f2" }}
        />
      );
      const MobileItemImage = () => (
        <Item.Image
          src={PizzaImage}
          alt={name}
          size="small"
          style={{ background: "none" }}
        />
      );

      return {
        childKey: id,
        header: (
          <Item.Header>
            <Link to={`/menu/${id}/`}>{name && capitalize(name)}</Link>
          </Item.Header>
        ),
        image: (
          <React.Fragment>
            <Responsive as={MobileItemImage} {...Responsive.onlyMobile} />
            <Responsive
              as={DesktopItemImage}
              minWidth={Responsive.onlyTablet.minWidth}
            />
          </React.Fragment>
        ),
        meta: `${quantity}x $${price}`,
        description: `${description}`,
        extra: (
          <Button
            basic
            icon="remove"
            floated="right"
            onClick={() => removeFromCart(id)}
          />
        ),
      };
    });

  return (
    <div>
      <Item.Group divided items={mapCartItemsToItems(items)} />
      {!loading && (
        <CartSummary totalPrice={totalPrice} />
      )}
    </div>
  );
};
