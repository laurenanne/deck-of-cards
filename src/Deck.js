import React, { useState, useEffect } from "react";
import Card from "./Card.js";
import axios from "axios";

function Deck() {
  const [deck, setDeck] = useState("");
  const [card, setCard] = useState({ image: "", status: "" });

  // this is called after component is first added to DOM
  // and every time deck is shuffled
  useEffect(
    function fetchNewDeck() {
      async function fetchDeck() {
        const deckResult = await axios.get(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        setDeck(deckResult.data.deck_id);
      }
      fetchDeck();
    },
    [card.status]
  );

  //called on button click  async function fetchCard() {
  async function fetchCard() {
    const cardResult = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
    );

    if (cardResult.data.error) {
      alert("Error: no cards remaining!");
      setCard({ image: "" });
      setCard({ status: "reload" });
    } else {
      setCard({
        image: cardResult.data.cards[0].image,
      });
    }
  }

  return (
    <div>
      <div>
        <Card card={card} />
      </div>
      <button onClick={fetchCard}>Get Card</button>
    </div>
  );
}

export default Deck;
