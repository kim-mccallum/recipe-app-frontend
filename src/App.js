import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Users from "./user/pages/Users";
import NewRecipe from "./recipes/pages/NewRecipe";
import UserRecipes from "./recipes/pages/UserRecipes";

const App = () => {
  return (
    // moves through routes top to bottom and redirects if nothing catches
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/recipes" exact>
            <UserRecipes />
          </Route>
          <Route path="/recipes/new" exact>
            <NewRecipe />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
