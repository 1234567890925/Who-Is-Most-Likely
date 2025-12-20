import { actions } from "./actions";

const templates = [
  "Who is most likely to {action}",
  "Who is most likely to secretly {action}",
  "Who is most likely to regret {action}",
  "Who is most likely to get caught {action}",
];

export function generatePrompt(rand: () => number): string {
  const template = templates[Math.floor(rand() * templates.length)];
  const action = actions[Math.floor(rand() * actions.length)];
  // If the action already contains the full prompt (starts with the
  // prefix), return it as-is to avoid duplication like
  // "Who is most likely to Who is most likely to..."
  if (action.startsWith("Who is most likely to")) {
    return action;
  }

  return template.replace("{action}", action);
}
