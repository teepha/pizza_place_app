import React from "react";
import Headroom from "react-headroom";
import { Container } from "semantic-ui-react";
import Footer from "../Footer";
import Header from "../Header";
import "semantic-ui-css/semantic.min.css";
import CartProvider from "../Context/CartProvider";

const Layout = ({ location, children }) => (
  <>
    <CartProvider>
      <Headroom
        upTolerance={10}
        downTolerance={10}
        style={{ zIndex: "20", height: "6.5em" }}
      >
        <Header location={location} />
      </Headroom>
      <Container text>{children}</Container>
      <Footer />
    </CartProvider>
  </>
);

export default Layout;
