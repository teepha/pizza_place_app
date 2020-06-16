import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Segment,
  Divider,
  Form,
  Input,
  Message,
  Modal,
} from "semantic-ui-react";
import swal from "sweetalert";
import useForm from "../Hooks/useForm";
import { createOrder } from "../../services/orderServices";
import { dollarsToEuros } from "../../utils/helpers";

export default ({ totalPrice }) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState([]);
  const history = useHistory();
  const deliveryFee = 5.0;

  const formCheckout = async () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));

    await createOrder({
      items: cartItems,
      name: values.name,
      surname: values.surname,
      address: values.address,
      phone_number: values.phone_number,
    })
      .then((data) => {
        swal("Yay!", data, "success");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("menuIds");
        history.push("/");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setApiError(e.errors || e);
      });
  };

  const { values, handleChange, handleSubmit, errors } = useForm(
    formCheckout,
    validate
  );

  const handleErrors = (errors) => {
    if (!Array.isArray(errors) && !errors.length > 0) {
      return (
        <Message error header="Sorry" content="Sorry, invalid credentials" />
      );
    }
    return errors.map((e) => (
      <Message error header={e.title} content={e.detail} key={e.status} />
    ));
  };

  return (
    <div>
      <Segment>
        <div>
          <strong>Sub Total: </strong>
          {`$${totalPrice}`} ({dollarsToEuros(totalPrice)})
        </div>
        <div>
          <strong>Delivery Fee: </strong>
          {`$${deliveryFee}`} ({dollarsToEuros(deliveryFee)})
        </div>
      </Segment>
      <Divider />
      <Segment clearing size="large">
        <span>
          <strong>Total Price: </strong>
          {`$${totalPrice + deliveryFee}`} (
          {dollarsToEuros(totalPrice + deliveryFee)})
        </span>

        <Modal
          trigger={
            <Button color="black" floated="right">
              Check out
            </Button>
          }
        >
          <Modal.Header>Delivery Details</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit} loading={loading} error={!!errors}>
              {apiError.length !== 0 ? handleErrors(errors) : null}
              <Segment id="submit-order">
                <Form.Field id="Form-something">
                  <label htmlFor="name">First Name</label>
                  <Input
                    id="name"
                    fluid
                    name="name"
                    autoFocus
                    onChange={handleChange}
                    value={values.name || ""}
                  />
                </Form.Field>
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                <Form.Field>
                  <label htmlFor="surname">Surname</label>
                  <Input
                    id="surname"
                    fluid
                    name="surname"
                    autoFocus
                    onChange={handleChange}
                    value={values.surname || ""}
                  />
                </Form.Field>
                {errors.surname && (
                  <p style={{ color: "red" }}>{errors.surname}</p>
                )}

                <Form.Field>
                  <label htmlFor="address">Address</label>
                  <Input
                    id="address"
                    fluid
                    name="address"
                    autoFocus
                    onChange={handleChange}
                    value={values.address || ""}
                  />
                </Form.Field>
                {errors.address && (
                  <p style={{ color: "red" }}>{errors.address}</p>
                )}

                <Form.Field>
                  <label htmlFor="phone_number">Phone Number</label>
                  <Input
                    id="phone_number"
                    fluid
                    name="phone_number"
                    autoFocus
                    onChange={handleChange}
                    value={values.phone_number || ""}
                  />
                </Form.Field>
                {errors.phone_number && (
                  <p style={{ color: "red" }}>{errors.phone_number}</p>
                )}
                <Button type="submit" color="orange">
                  Submit
                </Button>
              </Segment>
            </Form>
          </Modal.Content>
        </Modal>
      </Segment>
    </div>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.surname) {
    errors.surname = "Surname is required";
  }
  if (!values.address) {
    errors.address = "Address is required";
  }
  if (!values.name) {
    errors.name = "A name is required";
  }
  if (!values.phone_number) {
    errors.phone_number = "A name is required";
  }
  return errors;
};
