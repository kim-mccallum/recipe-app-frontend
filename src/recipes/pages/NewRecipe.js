import React from "react";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import "./NewRecipe.css";

const NewRecipe = () => {
  return (
    <form className="recipe-form">
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[]}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
      />
    </form>
  );
};

export default NewRecipe;
