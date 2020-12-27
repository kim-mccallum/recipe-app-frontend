// fetch and render all the places from a user
import React from "react";
import RecipeList from "../components/RecipeList";

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

const UserRecipes = () => {
  return <RecipeList items={DUMMY_RECIPES} />;
};

export default UserRecipes;
