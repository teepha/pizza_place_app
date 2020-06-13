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

export default [
  {
    name: "home",
    component: Home,
    exact: true,
    path: "/",
  },
];
