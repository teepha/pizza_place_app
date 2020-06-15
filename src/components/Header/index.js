import React, { useContext } from "react";
import { Responsive } from "semantic-ui-react";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import AuthContext from "../Context/AuthContext";

const Header = ({ location }) => {
  const { token, signOut } = useContext(AuthContext);
  let cartItemIds = JSON.parse(localStorage.getItem("menuIds"));
  const cartCount = cartItemIds && cartItemIds.length;

  return (
    <>
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <MobileMenu
          location={location}
          token={token}
          cartCount={cartCount}
          signout={signOut}
        />
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <DesktopMenu
          location={location}
          token={token}
          cartCount={cartCount}
          signout={signOut}
        />
      </Responsive>
    </>
  );
};

export default Header;
