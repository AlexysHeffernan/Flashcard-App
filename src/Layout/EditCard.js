import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ErrorMessage from "./ErrorMessage";

function EditCard() {
  const navigate = useNavigate();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [error, setError] = useState(undefined);

  const [formData, setFormData] = useState({});

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal)
      .then((response) => {
        setCard(response);
        setFormData({
          front: response.front,
          back: response.back,
        });
      })
      .catch((error) => {
        setError(error);
      });
    return () => abortController.abort();
  }, [cardId]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", formData);
    updateCard({ ...formData, id: cardId, deckId });
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
              <Breadcrumb.Item active>Edit Card: {cardId}</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card.Title>
      </Card>
      <Row>
        <h1>Edit Card</h1>{" "}
      </Row>
      <form name="create" onSubmit={handleSubmit}>
        <div>
          <h6>Front </h6>
          <textarea
            name="front"
            id="front"
            placeholder={card}
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
          Cancel
        </Button>

        <Button type="submit" variant="primary" onClick={handleSubmit} className="ml-2">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default EditCard;
