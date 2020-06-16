/* eslint-disable camelcase */
import React from "react";
import { Card, Image,Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PizzaImage from "../../styles/images/bbq-beef.png";
import { capitalize, dollarsToEuros } from "../../utils/helpers";

const mapMenusToItems = (menus) =>
// { `$${totalPrice}` } ({ dollarsToEuros(totalPrice) })
  menus.map(({ name, id, price }) => {
    return {
      as: Link,
      to: `/menu/${id}`,
      key: id,
      image: (
        <Image
          src={PizzaImage}
          sizes="max-width: 600px) 100vw, 600px"
          alt={name}
        />
      ),
      header: capitalize(name),
      meta: <Card.Meta style={{ color: "dimgray" }}>{`$${price}`} ({dollarsToEuros(price)})</Card.Meta>,
    };
  });

export default ({ menus, loading }) => {
   if (loading) return <Loader active inline="centered" />;
  return (
    <Card.Group
      loading={loading}
      items={mapMenusToItems(menus)}
      itemsPerRow={2}
      stackable
    />
  );
};
