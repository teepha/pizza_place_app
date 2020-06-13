/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { Segment, Container, Grid, List, Header } from "semantic-ui-react";

const twitterLink = (
  <a href="#" alt="twitter link">
    Twitter
  </a>
);
const facebookLink = (
  <a href="#" alt="facebook link">
    Facebook
  </a>
);
const emailLink = (
  <a href="#" alt="email link">
    Email
  </a>
);

const Footer = () => (
  <Segment
    vertical
    style={{
      padding: "4em 0em",
      marginTop: "3em",
      borderTop: "1px solid #f2f2f2",
    }}
  >
    <Container text>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header as="h4" content="About" />
            <List>
              <List.Item as={Link} to="#">
                Privacy
              </List.Item>
              <List.Item as={Link} to="#">
                Terms
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as="h4" content="Services" />
            <List>
              <List.Item as={Link} to="/">
                Our Menu
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4">Footer Header</Header>
            <p>
              Copyright &copy; {new Date().getFullYear()} Pizza Place. All
              rights reserved.
            </p>
            <List horizontal style={{ display: "flex" }}>
              <List.Item
                icon="twitter"
                style={{ display: "flex" }}
                content={twitterLink}
              />
              <List.Item
                icon="facebook"
                style={{ display: "flex" }}
                content={facebookLink}
              />
              <List.Item
                icon="mail"
                style={{ display: "flex" }}
                content={emailLink}
              />
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;
