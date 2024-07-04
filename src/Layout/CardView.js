import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { readDeck } from "../utils/api/index.js";
import {
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const CardView = () => {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [error, setError] = useState(undefined);
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
    return () => abortController.abort();
  }, [deckId]);

  const handleNext = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowFront(true);
    } else {
      if (
        window.confirm(
          "Restart cards? Click 'cancel' to return to the home page."
        )
      ) {
        setCurrentCardIndex(0);
        setShowFront(true);
      } else {
        navigate("/");
      }
    }
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!deck.id) {
    return <p>Loading...</p>;
  }

  const handleFlip = () => {
    setShowFront(!showFront);
  };

  const currentCard = deck.cards[currentCardIndex];

  return (
    <div>
      {deck.cards && deck.cards.length > 2 ? (
        <Card>
          <Card.Body>
            <Card.Title>
              Card {currentCardIndex + 1} of {deck.cards.length}{" "}
            </Card.Title>
            <Card.Text>
              {showFront ? currentCard.front : currentCard.back}
            </Card.Text>
            <Button variant="secondary" onClick={handleFlip}>
              Flip
            </Button>
            {!showFront && (
              <Button variant="primary" onClick={handleNext} className="ml-2">
                Next
              </Button>
            )}
          </Card.Body>
        </Card>
      ) : (
        <Outlet context={{ deck }} />
      )}
    </div>
  );
};

export default CardView;
