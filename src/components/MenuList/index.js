/* eslint-disable camelcase */
import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PizzaImage from "../../styles/images/bbq-beef.png";

const mapMenusToItems = (menus) =>
  menus.map(({ name, id, price }) => {
    const formattedPrice = `$ ${price}.00`;
    return {
      as: Link,
      to: `/menu/${id}`,
      childKey: id,
      image: (
        <Image
          src={PizzaImage}
          sizes="max-width: 600px) 100vw, 600px"
          alt={name}
        />
      ),
      header: name,
      meta: (
        <Card.Meta style={{ color: "dimgray" }}>{formattedPrice}</Card.Meta>
      ),
    };
  });

export default ({ menus }) => (
  <Card.Group items={mapMenusToItems(menus)} itemsPerRow={2} stackable />
);
