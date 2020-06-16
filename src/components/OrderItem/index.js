import React, { useState, useEffect } from "react";
import {
  Header,
  Loader,
  Grid,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import Layout from "../Layout";
import { getOrderItems } from "../../services/orderServices";
import { capitalize } from "../../utils/helpers";
import itemImage from "../../styles/images/bbq-beef.png";
import { dollarsToEuros } from "../../utils/helpers";

export default ({ location, match, history }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orderItems, setOrderItems] = useState(null);
  const {
    params: { id },
  } = match;
  const deliveryFee = 5.0;

  useEffect(() => {
    const token = localStorage.getItem("customerToken");
    if (!token) {
      history.push("/login/");
    }
    const getOrder = async () => {
      try {
        const order = await getOrderItems(id);
        setOrderItems(order);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getOrder();
  }, [history, id]);

  const totalPrice =
    orderItems &&
    orderItems.menus.reduce(
      (acc, item) => acc + parseInt(item.menuOrders.price),
      parseInt(deliveryFee)
    );

  if (loading) return <Loader active inline="centered" />;

  return (
    <Layout location={location}>
      {error ? (
        <Message warning>
          <Message.Header>Oops!</Message.Header>
          <p>Something went wrong....</p>
        </Message>
      ) : (
        <>
          {orderItems &&
            orderItems.menus.map((menu) => (
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Image
                    src={itemImage}
                    style={{ width: "250px" }}
                    sizes="max-width: 600px) 100vw, 600px"
                    alt="{item name}"
                  />
                </Grid.Column>
                <Grid.Column floated="left" width={10}>
                  <Header>{capitalize(menu.name)}</Header>
                  <p>Description: {menu.description}</p>
                  <p>Quantity: {menu.menuOrders.quantity}</p>
                  <p>Price: ${menu.menuOrders.price}</p>
                </Grid.Column>
              </Grid>
            ))}

          <Segment.Group>
            <Segment>
              <div>
                <strong>Delivery Fee: </strong>
                {`$${deliveryFee}`} ({dollarsToEuros(deliveryFee)})
              </div>
            </Segment>

            <Segment clearing size="large">
              <span>
                <strong>Total Price: </strong>
                {`$${totalPrice}`} ({dollarsToEuros(totalPrice)})
              </span>
            </Segment>

            <Segment>
              <Header>DELIVERY INFORMATION</Header>
              <p>
                Name: {orderItems && orderItems.name}{" "}
                {orderItems && orderItems.surname}
              </p>
              <p>Addresss: {orderItems && orderItems.address}</p>
              <p>Phone Number: {orderItems && orderItems.phone_number}</p>
            </Segment>
          </Segment.Group>
        </>
      )}
    </Layout>
  );
};
