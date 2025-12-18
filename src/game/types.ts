export type CardStatus = "active" | "played" | "skipped" | "discarded";

export type GameCard = {
  id: string;
  text: string;
  status: CardStatus;
};
