import React from "react";
import Layout from "../components/Layout";

const Home = ({ location }) => {
  return (
    <Layout location={location}>
      <p>Inside Home</p>
    </Layout>
  );
};

export default Home;
