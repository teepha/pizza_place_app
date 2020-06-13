import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ProductList from "../components/MenuList";
import { getAllMenu } from "../services/menuServices";

const Home = ({ location }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllMenuItems = async () => {
      const prod = await getAllMenu();
      setProducts(prod);
    };
    getAllMenuItems();
  }, []);
  
  return (
    <Layout location={location}>
      <ProductList products={products} />
    </Layout>
  );
};

export default Home;
