import React, { useState, useEffect, useRef } from "react";
import Card from "./Card.js";
import axios from "axios";

function Deck() {
  const [deck, setDeck] = useState("");
  const [card, setCard] = useState({ image: "", status: undefined });
  const [isDraw, setIsDraw] = useState(false);
  const timerId = useRef();

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

  const toggleDraw = () => {
    setIsDraw((isDraw) => !isDraw);
  };

  //called on button click  async function fetchCard() {
  async function fetchCard() {
    const cardResult = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
    );

    if (cardResult.data.error) {
      alert("Error: no cards remaining!");
      setCard({ image: "", status: "reload" });
      setIsDraw(false);
    } else {
      setCard({
        image: cardResult.data.cards[0].image,
      });
    }
  }

  function setTimer() {
    timerId.current = setInterval(() => {
      fetchCard();
    }, 1000);
  }

  function cleanUpTimer() {
    clearInterval(timerId.current);
  }

  useEffect(() => {
    if (isDraw) {
      setTimer();
    } else {
      cleanUpTimer();
    }
  }, [isDraw]);

  return (
    <div>
      <div>
        <Card card={card} />
      </div>
      <button
        style={{ visibility: isDraw ? "hidden" : "visible" }}
        onClick={toggleDraw}
      >
        Start Drawing
      </button>

      <button
        style={{ visibility: isDraw ? "visible" : "hidden" }}
        onClick={toggleDraw}
      >
        Stop Drawing
      </button>
    </div>
  );
}

export default Deck;
