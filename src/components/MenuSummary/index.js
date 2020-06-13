import React from "react";
import { Item, Header, Divider, Image } from "semantic-ui-react";
import PizzaImage from "../../styles/images/bbq-beef.png";

export default (menu) => {
  const { name, description, price } = menu;
  const formattedPrice = `$${price}.00`;

  return (
    <Item.Group>
      <Item style={{ alignItems: "center" }}>
        <Item.Image size="medium">
          <Image
            src={PizzaImage}
            style={{ width: "250px" }}
            sizes="max-width: 600px) 100vw, 600px"
            alt={name}
          />
        </Item.Image>
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>{formattedPrice}</p>
          </Item.Description>
          
        </Item.Content>
      </Item>

      <Header as="h3">About this menu</Header>
      <Divider />
      <p>{description}</p>
    </Item.Group>
  );
};
