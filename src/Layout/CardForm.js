import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readCard } from "../utils/api/index.js";
import Button from "react-bootstrap/Button";
import ErrorMessage from "./ErrorMessage";

function CardForm({ isNewCard, initialFormData, onSubmit }) {
  const navigate = useNavigate();
  const { deckId, cardId } = useParams();
  const [formData, setFormData] = useState({ ...initialFormData });
  const [error, setError] = useState(undefined);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }; 

  useEffect(() => {
  if (!isNewCard) {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal)
      .then((response) => {
        setFormData({
          front: response.front,
          back: response.back,
        });
      })
      .catch((error) => {
        setError(error);
      });
    return () => abortController.abort();
  }
}, [cardId, isNewCard]);

if (error) {
  return <ErrorMessage error={error} />;
}

const handleSubmit = (event) => {
  event.preventDefault();
  onSubmit(formData);
};

  return (
    <form name="create" onSubmit={handleSubmit}>
    <div>
      <h6>Front </h6>
      <textarea
        name="front"
        id="front"
        placeholder="Front side of card"
        onChange={handleChange}
        value={formData.front}
      ></textarea>
    </div>
    <div>
      <h6>Back </h6>
      <textarea
        name="back"
        id="back"
        placeholder="Back side of card"
        onChange={handleChange}
        value={formData.back}
      ></textarea>
    </div>

    <Button
      variant="secondary"
      onClick={() => navigate(`/decks/${deckId}`)}
    >
      {isNewCard ? "Done" : "Cancel"}
    </Button>

    <Button type="submit" variant="primary" className="ml-2">
      {isNewCard ? "Save" : "Submit"}
    </Button>
  </form>
  );
}

export default CardForm;
