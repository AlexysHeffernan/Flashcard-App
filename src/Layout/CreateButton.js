import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function CreateButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => navigate("/decks/new")}
    >
      Create Deck
    </Button>
  );
}

export default CreateButton;
