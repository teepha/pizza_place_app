/* eslint-disable camelcase */
import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PizzaImage from "../../styles/images/bbq-beef.png";

const mapProductsToItems = (products) =>
  products.map(({ name, id, price }) => {
    const formattedPrice = `$ ${price}.00`;
    return {
      as: Link,
      to: `/product/${id}`,
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

export default ({ products }) => (
  <Card.Group items={mapProductsToItems(products)} itemsPerRow={2} stackable />
);
