import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// import Users from "./user/pages/Users";
// import NewRecipe from "./recipes/pages/NewRecipe";
// import UserRecipes from "./recipes/pages/UserRecipes";
// import UpdateRecipe from "./recipes/pages/UpdateRecipe";
// import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = React.lazy(() => import("./user/pages/Users"));
const NewRecipe = React.lazy(() => import("./recipes/pages/NewRecipe"));
const UserRecipes = React.lazy(() => import("./recipes/pages/UserRecipes"));
const UpdateRecipe = React.lazy(() => import("./recipes/pages/UpdateRecipe"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
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
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/recipes" exact>
          <UserRecipes />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    // make sure all child components have access to component
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token, //!!makes it true if it exists
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      {/* // moves through routes top to bottom and redirects if nothing catches */}
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
