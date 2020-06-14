/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */
import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import {
  Header,
  Form,
  Input,
  Button,
  Segment,
  Message,
} from "semantic-ui-react";
import AuthContext from "../components/Context/AuthContext";
import { register } from "../services/userServices";
import Layout from "../components/Layout";
import useForm from "../components/Hooks/useForm";
import { setLocalStorageItem } from "../utils/helpers";

const Register = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState([]);
  const { updateToken } = useContext(AuthContext);
  const history = useHistory();

  const formRegister = async () => {
    setLoading(true);
    await register({
      name: values.name,
      username: values.username,
      password: values.password,
    })
      .then((data) => {
        const { id, token } = data;
        setLocalStorageItem("customerToken", token);
        setLocalStorageItem("mcustomer", id);
        updateToken();
        history.push("/myaccount");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setApiError(e.errors || e);
      });
  };

  const { values, handleChange, handleSubmit, errors } = useForm(
    formRegister,
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
    <Layout location={location}>
      <Header as="h1">Create an account</Header>
      <Form onSubmit={handleSubmit} loading={loading} error={!!errors}>
        {apiError.length !== 0 ? handleErrors(errors) : null}
        <Segment>
          <Form.Field>
            <label htmlFor="name">Name</label>
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
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              fluid
              name="username"
              onChange={handleChange}
              value={values.username || ""}
            />
          </Form.Field>
          {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
          <Form.Field>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              fluid
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password || ""}
            />
          </Form.Field>
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          <Button type="submit" color="orange">
            Register
          </Button>
        </Segment>
      </Form>
    </Layout>
  );
};

export default Register;

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Username address is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  if (!values.name) {
    errors.name = "A name is required";
  }
  return errors;
};
