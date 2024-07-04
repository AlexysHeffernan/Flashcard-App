import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
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

  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
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
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", formData);
    createCard(formData);
    setFormData({ ...initialFormState });
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

        <Button variant="secondary" onClick={() => navigate("/")}>
          Done
        </Button>

        <Button type="submit" variant="primary" onClick={handleSubmit} className="ml-2">
          Save
        </Button>
      </form>
    </Container>
  );
}

export default NewCard;
