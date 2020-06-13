import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import MenuSummary from "../components/MenuSummary";
import { getAMenu } from "../services/menuServices";

const MenuItem = (props) => {
  const { location, match } = props;
  const [menuItem, setMenuItem] = useState([]);

  useEffect(() => {
    const getSingleMenuItem = async () => {
      const item = await getAMenu(match.params.id);
      setMenuItem(item);
    };
    getSingleMenuItem();
  }, [match.params.id]);

  return (
    <Layout location={location}>
      <MenuSummary {...menuItem} />
    </Layout>
  );
};

export default MenuItem;
