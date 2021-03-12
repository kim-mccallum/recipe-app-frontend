import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./RecipeForm.css";

const NewRecipe = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
      image: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const recipeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("ingredients", formState.inputs.ingredients.value);
      formData.append("instructions", formState.inputs.instructions.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest("http://localhost:5000/api/recipes", "POST", formData, {
        Authorization: `Bearer ${auth.token}`,
      });
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="recipe-form" onSubmit={recipeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD RECIPE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewRecipe;
