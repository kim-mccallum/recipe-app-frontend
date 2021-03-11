import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./RecipeForm.css";

const UpdateRecipe = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedRecipe, setLoadedRecipe] = useState();
  //extract from the URL that is part of the URL set up in the routes
  const recipeId = useParams().recipeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      //add ingredients and instructions!!!
      ingredients: {
        value: "",
        isValid: false,
      },
      instructions: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  //avoid infinite loop by wrapping call in useEffect
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/recipes/${recipeId}`
        );

        setLoadedRecipe(responseData.recipe);
        setFormData(
          {
            title: {
              value: responseData.recipe.title,
              isValid: true,
            },
            description: {
              value: responseData.recipe.description,
              isValid: true,
            },
            ingredients: {
              value: responseData.recipe.ingredients,
              isValid: true,
            },
            instructions: {
              value: responseData.recipe.instructions,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchRecipe();
  }, [sendRequest, recipeId, setFormData]);

  const recipeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    //send post request to update
    try {
      await sendRequest(
        `http://localhost:5000/api/recipes/${recipeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          ingredients: formState.inputs.ingredients.value,
          instructions: formState.inputs.instructions.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      //just redirect to overview of places
      history.push(`/${auth.userId}/recipes`);
    } catch (err) {}
  };

  //temporary workaround - only render if you have values
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }
  if (!loadedRecipe && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find recipe!</h2>
        </Card>
      </div>
    );
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedRecipe && (
        <form className="recipe-form" onSubmit={recipeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedRecipe.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={loadedRecipe.description}
            initialValid={true}
          />
          <Input
            id="inredients"
            element="textarea"
            label="Ingredients"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid set of inredients (at least 5 characters)."
            onInput={inputHandler}
            initialValue={loadedRecipe.ingredients}
            initialValid={true}
          />
          <Input
            id="instructions"
            element="textarea"
            label="Instructions"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid set of instructions (at least 5 characters)."
            onInput={inputHandler}
            initialValue={loadedRecipe.instructions}
            initialValid={formState.inputs.instructions.isValid}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE RECIPE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateRecipe;
