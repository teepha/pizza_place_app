/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";
import { Item, Button, Message, Responsive, Loader } from "semantic-ui-react";
import PizzaImage from "../../styles/images/bbq-beef.png";
import { capitalize } from "../../utils/helpers";

export default ({ items, loading, removeFromCart, completed }) => {
  if (loading) return <Loader active inline="centered" />;

  if (completed)
    return (
      <Message success>
        <Message.Header>Order placed!</Message.Header>
        <p>Congratulations. Your order and payment has been accepted.</p>
      </Message>
    );

  if (items.length === 0)
    return (
      <Message warning>
        <Message.Header>Your cart is empty</Message.Header>
        <p>
          You will need to add some items to the cart before you can checkout.
        </p>
      </Message>
    );
  const mapCartItemsToItems = (items) =>
    items.map(({ id, price, name, quantity, description }) => {
      console.log(quantity);
      const formattedPrice = `$${price}.00`;

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
        meta: `${quantity}x ${formattedPrice}`,
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
  return <Item.Group divided items={mapCartItemsToItems(items)} />;
};
