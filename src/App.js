import React, { useState, useCallback } from "react";
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
import UpdateRecipe from "./recipes/pages/UpdateRecipe";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //wrap with useCallback so that the function is not recreated unnecessarily
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    // make sure all child components have access to component
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
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
            <Route path="/recipes/:recipeId" exact>
              <UpdateRecipe />
            </Route>
            <Route path="/auth" exact>
              <Auth />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
