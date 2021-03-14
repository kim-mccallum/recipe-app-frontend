// fetch and render all the places from a user
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserRecipes = () => {
  const [loadedRecipes, setLoadedRecipes] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/recipes/user/${userId}`
        );
        setLoadedRecipes(responseData.recipes);
      } catch (err) {}
    };
    fetchRecipes();
  }, [sendRequest, userId]);

  const deleteRecipeHandler = (deletedRecipeId) => {
    setLoadedRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== deletedRecipeId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedRecipes && (
        <RecipeList
          items={loadedRecipes}
          onDeleteRecipe={deleteRecipeHandler}
        />
      )}
    </React.Fragment>
  );
};

export default UserRecipes;
