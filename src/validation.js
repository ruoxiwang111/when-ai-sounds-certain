const OPTION_KEYS = ["A", "B", "C", "D"];

export function validateItem(item, { mode = "test" } = {}) {
  const errors = [];
  const keys = Object.keys(item.options ?? {});
  if (keys.length !== 4 || !OPTION_KEYS.every((key) => keys.includes(key))) {
    errors.push("options must contain exactly A, B, C, and D");
  }
  if (!keys.includes(item.correct_answer)) errors.push("correct_answer must exist in options");
  if (!keys.includes(item.ai_answer)) errors.push("ai_answer must exist in options");
  if (item.ai_correct !== (item.ai_answer === item.correct_answer)) errors.push("ai_correct is inconsistent");
  if (item.trial_type === "experimental" && !item.shared_reasoning?.trim()) errors.push("experimental item requires shared_reasoning");
  if (!item.pretest_status) errors.push("pretest_status is required");
  if (typeof item.source_notes !== "string") errors.push("source_notes must exist as a string");
  if (typeof item.ambiguity_notes !== "string") errors.push("ambiguity_notes must exist as a string");
  if (mode === "real" && !item.approved) errors.push("unapproved items cannot run in real-participant mode");
  return errors;
}

export function validateItems(items, options = {}) {
  const errors = [];
  const ids = items.map((item) => item.id);
  if (new Set(ids).size !== ids.length) errors.push("item IDs must be unique");
  for (const item of items) {
    for (const message of validateItem(item, options)) errors.push(`${item.id}: ${message}`);
  }
  return errors;
}

export function assertValidItems(items, options = {}) {
  const errors = validateItems(items, options);
  if (errors.length) throw new Error(`Item validation failed:\n${errors.join("\n")}`);
  return true;
}

export function primaryAnalysisTrials(records) {
  return records.filter((record) => record.trial_type === "experimental");
}
