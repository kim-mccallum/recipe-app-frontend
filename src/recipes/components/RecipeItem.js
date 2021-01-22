import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./RecipeItem.css";

const RecipeItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
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

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/recipes/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
      // setLoadedPlace(responseData.place);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
          {isLoading && <LoadingSpinner asOverlay />}
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
            {auth.isLoggedIn && (
              <Button to={`/recipes/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default RecipeItem;
