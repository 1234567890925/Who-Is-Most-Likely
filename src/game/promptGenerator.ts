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
  return template.replace("{action}", action);
}
