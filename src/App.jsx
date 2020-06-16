import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./routes";
import RouteManager from "./components/RouteManager";
import { Loader } from "semantic-ui-react";
import { getLocalStorageItem } from "./utils/helpers";

const App = () => {
  const token = getLocalStorageItem("customerToken");
  return (
    <Suspense fallback={<Loader active inline="centered" />}>
      <Router>
        <React.Fragment>
          <Switch>
            <Switch>{routes.map((route) => RouteManager(route, token))}</Switch>
          </Switch>
        </React.Fragment>
      </Router>
    </Suspense>
  );
};

export default App;
