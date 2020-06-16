import { lazy } from "react";
import { isLocalhost } from "../serviceWorker";
import Home from "../pages/home";
import OrderItems from "../components/OrderItem"

const lazyImport = (filePath) =>
  lazy(() =>
    new Promise((resolve, reject) => {
      if (isLocalhost()) {
        filePath === "./error"
          ? setTimeout(reject, 1000)
          : setTimeout(resolve, 1000);
      } else {
        resolve();
      }
    })
      .then(() => {
        return import("../pages/" + filePath);
      })
      .catch((err) => {
        console.log("error", err);
        return import("../pages/404");
      })
  );

const MenuItem = lazyImport("menuItem");
const Register = lazyImport("register");
const LoginPage = lazyImport("login");
const MyAccount = lazyImport("myaccount");
const Cart = lazyImport("cart");

export default [
  {
    name: "home",
    component: Home,
    exact: true,
    path: "/",
  },
  {
    name: "menu/:id",
    component: MenuItem,
    exact: true,
    path: "/menu/:id",
    authType: "unAuthenticated",
  },
  {
    name: "register",
    component: Register,
    exact: true,
    path: "/register",
    authType: "unAuthenticated",
  },
  {
    name: "login",
    component: LoginPage,
    exact: true,
    path: "/logIn",
    authType: "unAuthenticated",
  },
  {
    name: "myaccount",
    component: MyAccount,
    exact: true,
    path: "/myaccount",
    authType: "authenticated",
  },
  {
    name: "cart",
    component: Cart,
    exact: true,
    path: "/cart/",
    authType: "authenticated",
  },
  {
    name: "items",
    component: OrderItems,
    exact: true,
    path: "/orders/:id",
    authType: "authenticated",
  },
];
