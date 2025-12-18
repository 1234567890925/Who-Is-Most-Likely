import { useEffect, useState } from "react";
import Card from "./components/Cards";
import type { GameCard } from "./game/types";
import { generateDeck } from "./game/deckGenerator";
import './styles/styles.css'

export default function App() {
  const [deck, setDeck] = useState<GameCard[]>(generateDeck());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setPlayed] = useState<GameCard[]>([]);
  const [, setDiscarded] = useState<GameCard[]>([]);
  const [skipped, setSkipped] = useState<GameCard[]>([]);

  const currentCard = deck[currentIndex];

  function handleAction(action: "played" | "discarded" | "skipped") {
    if (!currentCard) return;

    if (action === "played") setPlayed(p => [...p, currentCard]);
    if (action === "discarded") setDiscarded(d => [...d, currentCard]);
    if (action === "skipped") setSkipped(s => [...s, currentCard]);

    setCurrentIndex(i => i + 1);
  }

  useEffect(() => {
    if (currentIndex >= deck.length && skipped.length > 0) {
      setDeck(shuffle(skipped));
      setSkipped([]);
      setCurrentIndex(0);
    }
  }, [currentIndex, deck, skipped]);

  function restartGame() {
    setDeck(generateDeck());
    setCurrentIndex(0);
    setPlayed([]);
    setDiscarded([]);
    setSkipped([]);
  }

  return (
    <div className="app">
        <div className="phone">
          {/* Top bar */}
          <div className="top-bar">
            <button className="restart-btn" onClick={restartGame} aria-label="Restart game">
              ⟳
            </button>
          </div>

          {/* Card area */}
          {currentCard ? (
            <Card text={currentCard.text} />
          ) : (
            <div className="card">
              <p>No more cards</p>
              <button onClick={restartGame}>Restart</button>
            </div>
          )}

          {/* Controls */}
          {currentCard && (
            <div className="controls">
              <button onClick={() => handleAction("discarded")}>Discard</button>
              <button onClick={() => handleAction("skipped")}>Skip</button>
              <button onClick={() => handleAction("played")}>Play</button>
            </div>
          )}
        </div>

      </div>
  );
}

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
