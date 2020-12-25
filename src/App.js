import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewRecipe from "./recipes/pages/NewRecipe";

const App = () => {
  return (
    // moves through routes top to bottom and redirects if nothing catches
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/recipes/new" exact>
          <NewRecipe />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
