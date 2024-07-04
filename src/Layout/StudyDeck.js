import React, { useState, useEffect} from "react";
import { Outlet, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ErrorMessage from "./ErrorMessage";


function StudyDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);
  
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

  return (
    <Container>
   <Card variant="secondary"> 
        <Card.Title >
          <Card.Body>
        <Breadcrumb >
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href={`/decks/${deckId}`}>{deck.name}</Breadcrumb.Item>
          <Breadcrumb.Item active>Study</Breadcrumb.Item>
        </Breadcrumb>
        </Card.Body>
        </Card.Title> 
        </Card>
      <Row><h1>{deck.name}: Study</h1> </Row>
  <Outlet context={{deck}}/>
    </Container>
  );
}

export default StudyDeck;