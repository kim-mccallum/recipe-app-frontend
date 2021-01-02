import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "./RecipeForm.css";

const DUMMY_RECIPES = [
  {
    id: "r1",
    title: "Apple with almond butter",
    description: "Perfect, filling snack on the go!",
    imageUrl:
      "https://www.chelanfresh.com/wp-content/uploads/2019/08/Lucy-Glo_NEW1.png",
    ingredients:
      "Apple (pink lady, honey crisp or Lucy Glo), 2 Tablespoons of almond butter",
    instructions:
      "Slice the apple (optional), smear almond butter on it and eat it!",
    creator: "u1",
  },
  {
    id: "r2",
    title: "Avocado Toast",
    description:
      "Quick filling snack with whole grain bread and rich, delicious avocado!",
    imageUrl:
      "https://fsi.colostate.edu/wp-content/uploads/2016/02/Coveravocado.jpg",
    ingredients:
      "2 slices of sprouted whole grain bread, 0.5 ripe avocado, 1 tablespoon nutritional yeast.",
    instructions:
      "Toast the bread. Slice the avocado in the skin, scoop it out with a fork and smash it onto the bread. Sprinkle with nutritional yeast and serve.",
    creator: "u2",
  },
];

const UpdateRecipe = () => {
  //extract from the URL that is part of the URL set up in the routes
  const recipeId = useParams().recipeId;
  const identifiedRecipe = DUMMY_RECIPES.find((r) => r.id === recipeId);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: identifiedRecipe.title,
        isValid: true,
      },
      description: {
        value: identifiedRecipe.description,
        isValid: true,
      },
      //add ingredients and instructions!!!
      ingredients: {
        value: identifiedRecipe.description,
        isValid: true,
      },
      instructions: {
        value: identifiedRecipe.description,
        isValid: true,
      },
    },
    true
  );

  const recipeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  console.log(recipeId, identifiedRecipe);
  if (!identifiedRecipe) {
    return (
      <div className="center">
        <h2>Could not find recipe!</h2>
      </div>
    );
  }
  return (
    <form className="recipe-form" onSubmit={recipeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Input
        id="inredients"
        element="textarea"
        label="Ingredients"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid set of inredients (at least 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.ingredients.value}
        initialValid={formState.inputs.ingredients.isValid}
      />
      <Input
        id="instructions"
        element="textarea"
        label="Instructions"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid set of instructions (at least 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.instructions.value}
        initialValid={formState.inputs.instructions.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE RECIPE
      </Button>
    </form>
  );
};

export default UpdateRecipe;
