import { lazy } from "react";
import { isLocalhost } from "../serviceWorker";

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

const Home = lazyImport("home");
const MenuItem = lazyImport("menuItem");
const Register = lazyImport("register");
const LoginPage = lazyImport("login");
const MyAccount = lazyImport("myaccount");

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
    redirectTo: "/menu/:id",
  },
  {
    name: "register",
    component: Register,
    exact: true,
    path: "/register",
    authType: "unAuthenticated",
    redirectTo: "/",
  },
  {
    name: "login",
    component: LoginPage,
    exact: true,
    path: "/logIn",
    authType: "unAuthenticated",
    redirectTo: "/",
  },
  {
    name: "myaccount",
    component: MyAccount,
    exact: true,
    path: "/myaccount",
    authType: "authenticated",
    redirectTo: "/login",
  },
];
