import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import MenuList from "../components/MenuList";
import { getAllMenu } from "../services/menuServices";

const Home = ({ location }) => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const getAllMenuItems = async () => {
      const menuItems = await getAllMenu();
      setMenus(menuItems);
    };
    getAllMenuItems();
  }, []);

  return (
    <Layout location={location}>
      <MenuList menus={menus} />
    </Layout>
  );
};

export default Home;
