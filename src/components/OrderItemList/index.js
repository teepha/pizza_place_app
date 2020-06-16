/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";
import { Header, Loader, Message, Label, Segment } from "semantic-ui-react";
import { capitalize } from "../../utils/helpers";

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

      {orders.map((order) => {
        console.log(">>>>ORDER>", order);
        const { id, name, surname, address, phone_number, menus } = order;
        // const completed = true;
        // const itemName = menus[0].name;
        // const itemDescription = menus[0].description;
        // const quantity = menus[0].menuOrders.quantity;
        // const price = `$${menus[0].price}.00`;
        // const totalPrice = `$${menus[0].menuOrders.price}.00`;

        // return (
        //   <Segment.Group key={id}>
        //     <Segment>
        //       <Header as="h4">Total Price: {totalPrice}</Header>
        //       <Label
        //         icon={completed ? "check" : null}
        //         color={completed ? "green" : null}
        //         content={"Completed"}
        //       />
        //     </Segment>

        //     <Segment.Group horizontal>
        //       <Segment>
        //         <Header as="h4">Billing address:</Header>
        //         <p>
        //           <strong>First name: </strong>
        //           {capitalize(name)}
        //           <br />
        //           <strong>Last name: </strong>
        //           {capitalize(surname)}
        //           <br />
        //           <strong>Address: </strong>
        //           {capitalize(address)}
        //           <br />
        //           <strong>Phone Number: </strong>
        //           {phone_number}
        //         </p>
        //       </Segment>
        //       <Segment>
        //         <Header as="h4">Order Details:</Header>
        //         <p>
        //           <strong>Item: </strong>
        //           {itemName}
        //           <br />
        //           <strong>Description: </strong>
        //           {itemDescription}
        //           <br />
        //           <strong>Quantity: </strong>
        //           {quantity}
        //           <br />
        //           <strong>Price: </strong>
        //           {price}
        //         </p>
        //       </Segment>
        //     </Segment.Group>
        //   </Segment.Group>
        // );
      })}
    </div>
  );
};
