import React, { useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "./RecipeForm.css";

const NewRecipe = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      ingredients: {
        value: "",
        isValid: false,
      },
      instructions: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const recipeSubmitHandler = (event) => {
    event.preventDefault();
    // no backend yet - for now just log/check it later send this to the backend
    console.log(formState.inputs);
  };

  return (
    <form className="recipe-form" onSubmit={recipeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a description of at least 5 characters."
        onInput={inputHandler}
      />
      <Input
        id="ingredients"
        element="textarea"
        label="Ingredients"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a list of ingredients for this recipe."
        onInput={inputHandler}
      />
      <Input
        id="instructions"
        element="textarea"
        label="Recipe Instructions"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter the instructions for this recipe."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD RECIPE
      </Button>
    </form>
  );
};

export default NewRecipe;
