import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { readDeck, updateDeck } from "../utils/api/index.js";
import ErrorMessage from "./ErrorMessage";

function EditDeck() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal)
      .then((response) => {
        setDeck(response);
        setFormData({
          name: response.name,
          description: response.description,
        });
      })
      .catch((error) => {
        setError(error);
      });
    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck({ ...formData, id: deckId })
      .then(() => navigate(`/decks/${deckId}`))
      .catch((error) => setError(error));
  };

  return (
    <Container>
      <Card variant="secondary">
        <Card.Title>
          <Card.Body>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href={`/decks/${deckId}`}>
                {deck.name}
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Edit Deck</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card.Title>
      </Card>
      <h1>Edit Deck</h1>
      <form name="edit" onSubmit={handleSubmit}>
        <div>
          <h6>Name </h6>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Deck Name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div>
          <h6>Description </h6>
          <textarea
            name="description"
            id="description"
            placeholder="Brief Description of the deck"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>

        <Button
          type="cancel"
          variant="secondary"
          onClick={() => navigate(`/decks/${deckId}`)}
        >
          Cancel
        </Button>

        <Button type="submit" onClick={handleSubmit} className="ml-2">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default EditDeck;
