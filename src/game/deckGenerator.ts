import { generatePrompt } from "./promptGenerator";
import type { GameCard } from "./types";

export function generateDeck(size = 40): GameCard[] {
  return Array.from({ length: size }, () => ({
    id: crypto.randomUUID(),
    text: generatePrompt(),
    status: "active",
  }));
}
