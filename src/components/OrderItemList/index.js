/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";
import {
  Header,
  Loader,
  Message,
  Grid,
  Divider,
  Segment,
} from "semantic-ui-react";
import { dateFormatter } from "../../utils/helpers";

export default ({ orders, loading }) => {
  if (loading) return <Loader active inline="centered" />;
  if (orders.length === 0) {
    return (
      <Message warning>
        <Message.Header>No recent orders</Message.Header>
        <p>
          When you place an order, they will appear here.
          <Link to="/"> Go shopping.</Link>
        </p>
      </Message>
    );
  }

  return (
    <div>
      <Header as="h1">My previous orders</Header>
      <Divider />
      {orders.map((order) => {
        return (
          <Segment>
            <Grid>
              <Grid.Column floated="left" width={5}>
                <div>
                  <Header>Order ID: {order.id}</Header>
                  <p>Placed on {dateFormatter(order.createdAt)}</p>
                </div>
                <p>Delivered on {dateFormatter(order.updatedAt)}</p>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Link to={`/orders/${order.id}`}>SEE DETAILS</Link>
              </Grid.Column>
            </Grid>
          </Segment>
        );
      })}
    </div>
  );
};
