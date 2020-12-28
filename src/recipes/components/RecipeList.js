import React from "react";

import Card from "../../shared/components/UIElements/Card";
import RecipeItem from "./RecipeItem";

import "./RecipeList.css";

const RecipeList = (props) => {
  // check if you don't have items
  if (props.items.length === 0) {
    return (
      <div className="recipe-list center">
        <Card>
          <h2>No recipes found. Maybe create one?</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="recipe-list">
      {props.items.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          id={recipe.id}
          image={recipe.imageUrl}
          title={recipe.title}
          description={recipe.description}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
          creatorId={recipe.creator}
        />
      ))}
    </ul>
  );
};

export default RecipeList;
