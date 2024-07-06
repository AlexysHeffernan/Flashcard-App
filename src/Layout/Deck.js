import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { deleteDeck, readDeck, deleteCard } from "../utils/api/index.js";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const Deck = () => {
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();
  const { deckId } = useParams();

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

  const handleDeckDelete = async (deckId) => {
    const result = window.confirm(
        "Delete this deck? You will not be able to recover it."
      );
      if (result) {
        try {
          await deleteDeck(deckId);
          navigate('/');
        } catch (error) {
          setError(error);
        }
      }
    };

  const handleCardDelete = async (cardId) => {
     const result = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (result) {
      try {
        await deleteCard(cardId);
        window.location.reload();
      } catch (error) {
        setError(error);
      }
    }
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }
console.log("DECK ", deck.cards);
  return (
    <div>
      <Card variant="secondary">
        <Card.Title>
          <Card.Body>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>{deck.name}</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card.Title>
      </Card>

      <h3>{deck.name}</h3>

      <p>{deck.description}</p>

      <Button
        variant="secondary"
        onClick={() => navigate(`/decks/${deck.id}/edit`)}
      >
        Edit
      </Button>
      <Button
        variant="primary"
        onClick={() => navigate(`/decks/${deck.id}/study`)} className="ml-2"
      > 
        Study
      </Button>

      <Button
        variant="primary"
        onClick={() => navigate(`/decks/${deck.id}/cards/new`)} className="ml-2"
      >
        Add Cards
      </Button>
      <Button variant="danger" onClick={()=>handleDeckDelete(deck.id)} className="ml-2"> 
        Delete
      </Button>

      <Row>
        <h3>Cards</h3>
      </Row>
      {deck.cards &&
        deck.cards
          .filter((card) => card.front !== "b")
          .map((card) => (
            <Card key={card.id} className="mb-3">
              <Row>
                <Col>
                  <Card.Text>{card.front}</Card.Text>
                </Col>
                <Col>
                  <Card.Text>{card.back}</Card.Text>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      navigate(`/decks/${card.deckId}/cards/${card.id}/edit`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2" onClick={()=>handleCardDelete(card.id)}  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
    </div>
  );
};

export default Deck;
