export const METRIC_FIELDS = Object.freeze([
  "initial_correct",
  "final_correct",
  "switched_answer",
  "followed_ai",
  "harmful_switch",
  "beneficial_switch",
  "incorrect_ai_adoption",
  "correct_ai_adoption",
  "appropriate_reliance",
  "underreliance",
  "confidence_change",
  "accuracy_change"
]);

export function calculateMetrics({
  initial_answer,
  final_answer,
  correct_answer,
  ai_answer,
  initial_confidence,
  final_confidence
}) {
  const initial_correct = initial_answer === correct_answer;
  const final_correct = final_answer === correct_answer;
  const aiCorrect = ai_answer === correct_answer;

  return {
    initial_correct,
    final_correct,
    switched_answer: initial_answer !== final_answer,
    followed_ai: final_answer === ai_answer,
    harmful_switch: initial_correct && !aiCorrect && final_answer === ai_answer,
    beneficial_switch: !initial_correct && aiCorrect && final_answer === ai_answer,
    incorrect_ai_adoption: !aiCorrect && final_answer === ai_answer,
    correct_ai_adoption: aiCorrect && final_answer === ai_answer,
    appropriate_reliance: (aiCorrect && final_answer === ai_answer) || (!aiCorrect && final_answer !== ai_answer),
    underreliance: aiCorrect && final_answer !== ai_answer,
    confidence_change: Number(final_confidence) - Number(initial_confidence),
    accuracy_change: Number(final_correct) - Number(initial_correct)
  };
}
