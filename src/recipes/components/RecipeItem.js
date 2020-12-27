import React from "react";

import Card from "../../shared/components/UIElements/Card";
import "./RecipeItem.css";

const RecipeItem = (props) => {
  return (
    <li className="place-item">
      <Card className="place-item">
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
          <button>VIEW RECIPE</button>
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </Card>
    </li>
  );
};

export default RecipeItem;
