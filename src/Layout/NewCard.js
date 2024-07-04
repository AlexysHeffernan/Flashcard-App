import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index.js";
import CardForm from "./CardForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ErrorMessage from "./ErrorMessage";

function NewCard() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);
  const initialFormState = {
    front: "",
    back: "",
  };

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal)
      .then((response) => {
        setDeck(response);
      })
      .catch((error) => {
        setError(error);
      });
    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const handleSubmit = (formData) => {
    createCard(deckId, formData);
    navigate(`/decks/${deckId}`);
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
              <Breadcrumb.Item active>Add Card</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card.Title>
      </Card>
      <Row>
        <h1>{deck.name}: Add Card</h1>
      </Row>
      <CardForm
        isNewCard={true}
        initialFormData={initialFormState}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

export default NewCard;
