export const CONDITIONS = Object.freeze({
  HIGH: "high_confidence",
  CALIBRATED: "calibrated_confidence"
});

export function parseConditionOverride(search = "") {
  const value = new URLSearchParams(search).get("condition");
  return Object.values(CONDITIONS).includes(value) ? value : null;
}

export function assignCondition(search = "", random = Math.random) {
  const override = parseConditionOverride(search);
  if (override) return { condition: override, method: "url_override" };
  return {
    condition: random() < 0.5 ? CONDITIONS.HIGH : CONDITIONS.CALIBRATED,
    method: "random"
  };
}

export function confidenceLanguage(condition) {
  if (condition === CONDITIONS.HIGH) {
    return "I am highly confident that the available information supports this choice.";
  }
  if (condition === CONDITIONS.CALIBRATED) {
    return "I am moderately confident that the available information supports this choice.";
  }
  throw new Error(`Unknown condition: ${condition}`);
}

export function buildAdvice(item, condition) {
  const answerLead = condition === CONDITIONS.HIGH
    ? `The answer is ${item.ai_answer}.`
    : `The answer may be ${item.ai_answer}.`;
  const framing = confidenceLanguage(condition);
  return {
    message: `${answerLead} ${item.shared_reasoning} ${framing}`,
    confidence_language: framing,
    invariant_content: {
      ai_answer: item.ai_answer,
      shared_reasoning: item.shared_reasoning
    }
  };
}
