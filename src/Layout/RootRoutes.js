import React from "react";
import DeckList from "./DeckList";
import Deck from "./Deck";
import NotFound from "./NotFound";
import NotEnough from "./NotEnough";
import NewDeck from "./NewDeck";
import EditDeck from "./EditDeck";
import StudyDeck from "./StudyDeck";
import NewCard from "./NewCard";
import EditCard from "./EditCard";
import CardView from "./CardView";
import { Routes, Route } from "react-router-dom";

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DeckList />} />

      <Route path="/decks/:deckId" element={<Deck />} />

      <Route path="/decks/new" element={<NewDeck />} />
      <Route path="/decks/:deckId/edit" element={<EditDeck />} />
      <Route path="/decks/:deckId/study" element={<StudyDeck />}>
        <Route path="" element={<CardView />}>
          <Route path="" element={<NotEnough />} />
        </Route>
      </Route>
      <Route path="/decks/:deckId/cards/new" element={<NewCard />} />
      <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RootRoutes;
