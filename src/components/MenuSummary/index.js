import React from "react";
import { Item, Header, Divider, Image, Segment, Loader } from "semantic-ui-react";
import AddToCart from "../AddToCart";
import PizzaImage from "../../styles/images/bbq-beef.png";
import { capitalize } from "../../utils/helpers";

export default ({menu, loading}) => {
  const { id, name, description, price } = menu;
  if (loading) return <Loader active inline="centered" />;

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
          <Item.Header>{name && capitalize(name)}</Item.Header>
          <Item.Description>
            <p>{`$${price}`}</p>
          </Item.Description>
          <Item.Extra>
            <AddToCart menuId={id} />
          </Item.Extra>
        </Item.Content>
      </Item>
      <Segment>
        <Header as="h3">About this menu</Header>
        <Divider />
        <p>{description}</p>
      </Segment>
    </Item.Group>
  );
};
