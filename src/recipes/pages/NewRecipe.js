import React from "react";
import Input from "../../shared/components/FormElements/Input";

import "./NewRecipe.css";

const NewRecipe = () => {
  return (
    <form className="recipe-form">
      <Input element="input" type="text" label="Title" />
    </form>
  );
};

export default NewRecipe;
