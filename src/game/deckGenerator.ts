import { generatePrompt } from "./promptGenerator";
import { mulberry32 } from "./seedRandom";
import type { GameCard } from "./types";

export function generateDeck(seed: number, size = 40): GameCard[] {
  const rand = mulberry32(seed);

  return Array.from({ length: size }, () => ({
    id: crypto.randomUUID(),
    text: generatePrompt(rand),
    status: "active",
  }));
}
