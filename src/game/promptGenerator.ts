const templates = [
  "Who is most likely to {action}",
  "Who is most likely to secretly {action}",
  "Who is most likely to regret {action}",
  "Who is most likely to get caught {action}",
];

const actions = [
  "text an ex at 2 AM",
  "fall for a red flag",
  "hook up on vacation",
  "ghost someone and come back",
  "start drama accidentally",
  "lie about their body count",
  "catch feelings first",
  "ruin the group chat",
];

export function generatePrompt(): string {
  const t = templates[Math.floor(Math.random() * templates.length)];
  const a = actions[Math.floor(Math.random() * actions.length)];
  return t.replace("{action}", a);
}
