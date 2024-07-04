import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

function NotEnough() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const { deck } = useOutletContext();
  
  return (
    <div>
    {deck.cards?
        <>
   <h1>Not enough cards.</h1>
 
     <p>You need at least 3 cards to study. There are 2 cards in this deck. </p>
             
    <Button variant="primary" onClick={() => navigate(`/decks/${deckId}/cards/new`)}>Add Cards</Button>
    </>
    : null
}
    </div>  


  );
}

export default NotEnough;
