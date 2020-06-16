import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import MenuList from "../components/MenuList";
import { getAllMenu } from "../services/menuServices";

const Home = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const getAllMenuItems = async () => {
      const menuItems = await getAllMenu();
      setMenus(menuItems);
      setLoading(false);
    };
    getAllMenuItems();
  }, []);

  return (
    <Layout location={location}>
      <MenuList menus={menus} loading={loading} />
    </Layout>
  );
};

export default Home;
