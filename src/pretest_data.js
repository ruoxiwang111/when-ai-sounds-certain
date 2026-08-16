import { buildAdvice } from "./conditions.js";

export const PRETEST_MATERIAL = Object.freeze({
  id: "developer_manipulation_pretest_01",
  scenario: "A classification rule states that every object in category L has property P. Object X belongs to category L.",
  question: "Does Object X have property P?",
  ai_answer: "Yes",
  shared_reasoning: "The stated rule applies to every object in category L, and Object X is explicitly described as belonging to that category.",
  material_status: "developer_fixture_not_validated"
});

export function buildPretestPresentation(condition) {
  return {
    scenario: PRETEST_MATERIAL.scenario,
    question: PRETEST_MATERIAL.question,
    advice: buildAdvice(PRETEST_MATERIAL, condition)
  };
}

export const PRETEST_RATING_FIELDS = Object.freeze([
  "perceived_ai_confidence",
  "perceived_clarity",
  "perceived_knowledge",
  "perceived_persuasiveness"
]);

export function buildPretestRecord(base, ratings) {
  const parsedRatings = Object.fromEntries(PRETEST_RATING_FIELDS.map((field) => {
    const value = Number(ratings[field]);
    if (!Number.isInteger(value) || value < 1 || value > 7) {
      throw new Error(`${field} must be an integer from 1 to 7.`);
    }
    return [field, value];
  }));

  return {
    ...base,
    ...parsedRatings,
    data_type: "test",
    storage_mode: "local_export",
    study_phase: "manipulation_pretest"
  };
}
