import { useEffect, useState } from "react";
import Card from "./components/Cards";
import type { GameCard } from "./game/types";
import { generateDeck } from "./game/deckGenerator";
import './styles/styles.css'

function getSeed(): number {
  const params = new URLSearchParams(window.location.search);
  const seedParam = params.get("seed");

  if (seedParam) return Number(seedParam);

  const newSeed = Math.floor(Math.random() * 1e9);
  params.set("seed", newSeed.toString());
  window.history.replaceState(null, "", `?${params.toString()}`);

  return newSeed;
}

export default function App() {
  const seed = getSeed();
  const [deck, setDeck] = useState<GameCard[]>(generateDeck(seed));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setPlayed] = useState<GameCard[]>([]);
  const [, setDiscarded] = useState<GameCard[]>([]);
  const [skipped, setSkipped] = useState<GameCard[]>([]);

  const currentCard = deck[currentIndex];

  function handleAction(action: "played" | "discarded" | "skipped") {
    const card = deck[currentIndex];
    if (!card) return;

    if (action === "played") {
      setPlayed(p => [...p, card]);
    }

    if (action === "discarded") {
      setDiscarded(d => [...d, card]);
    }

    if (action === "skipped") {
      setSkipped(s => [...s, card]);
    }

    // Move forward in deck — card is now gone forever
    setCurrentIndex(i => i + 1);
  }

  useEffect(() => {
    // End of deck
    if (currentIndex >= deck.length) {
      if (skipped.length > 0) {
        // Only skipped cards come back
        setDeck(shuffle(skipped));
        setSkipped([]);
        setCurrentIndex(0);
      }
    }
  }, [currentIndex, deck.length, skipped]);

  function restartGame() {
    const newSeed = Math.floor(Math.random() * 1e9);
    const params = new URLSearchParams(window.location.search);
    params.set("seed", newSeed.toString());
    window.history.replaceState(null, "", `?${params.toString()}`);

    setDeck(generateDeck(newSeed));
    setCurrentIndex(0);
    setSkipped([]);
    setPlayed([]);
    setDiscarded([]);
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
