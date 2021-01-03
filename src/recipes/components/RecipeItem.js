import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import "./RecipeItem.css";

const RecipeItem = (props) => {
  const [showRecipe, setShowRecipe] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openRecipeHandler = () => setShowRecipe(true);
  const closeRecipeHandler = () => setShowRecipe(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING...");
  };

  return (
    <React.Fragment>
      <Modal
        show={showRecipe}
        onCancel={closeRecipeHandler}
        header={props.title}
        contentClass="recipe-item__modal-content"
        footerClass="recipe-item__modal-actions"
        footer={<Button onClick={closeRecipeHandler}>CLOSE</Button>}
      >
        <div className="recipe-container">
          <h3>{props.description}</h3>
          <p>{`Ingredients ${props.ingredients}`}</p>
          <p>{props.instructions}</p>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="recipe-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this recipe? This cannot be undone.
        </p>
      </Modal>
      <li className="recipe-item">
        <Card className="recipe-item">
          <div className="recipe-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="recipe-item__info">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
          </div>
          <div className="recipe-item__actions">
            <Button inverse onClick={openRecipeHandler}>
              VIEW RECIPE
            </Button>
            <Button to={`/recipes/${props.id}`}>EDIT</Button>
            <Button danger onClick={showDeleteWarningHandler}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default RecipeItem;
