import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index.js";
import CreateButton from "./CreateButton";
import ErrorMessage from "./ErrorMessage";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const DeckList = () => {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal)
      .then((response) => {
        setDecks(response);
      })
      .catch((error) => {
        setError(error);
      });
    return () => abortController.abort();
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const handleDelete = async () => {
    const result = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (result) {
      await deleteDeck();
      navigate("/");
    }
  };

  const list = Array.isArray(decks)
    ? decks.filter((deck) => deck.name !== "")
    : null;
  const filteredList = list.map((deck) => (
    <Card key={deck.id}>
      <Card.Body>
        <Card.Title>{deck.name}</Card.Title>
        <Card.Text>{deck.description}</Card.Text>
        <Button
          variant="secondary"
          onClick={() => navigate(`/decks/${deck.id}`)}
        >
          View
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate(`/decks/${deck.id}/study`)} className="ml-2"
        
        >
          Study
        </Button>
        <Button variant="danger" onClick={handleDelete} className="ml-2">
          Delete
        </Button>
      </Card.Body>
    </Card>
  ));

  return (
    <main className="container">
      <CreateButton />
      <section>{filteredList}</section>
    </main>
  );
};

export default DeckList;
