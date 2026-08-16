import test from "node:test";
import assert from "node:assert/strict";
import { stageOneItems } from "../src/items.js";
import { primaryAnalysisTrials, validateItem, validateItems } from "../src/validation.js";

test("Stage 1 fixture IDs are unique and each item is structurally valid", () => {
  assert.deepEqual(validateItems(stageOneItems, { mode: "test" }), []);
  assert.equal(new Set(stageOneItems.map((item) => item.id)).size, stageOneItems.length);
  for (const item of stageOneItems) assert.deepEqual(Object.keys(item.options).sort(), ["A", "B", "C", "D"]);
});

test("answer and ai_correct inconsistencies are rejected", () => {
  assert.ok(validateItem({ ...stageOneItems[0], correct_answer: "Z" }).some((error) => error.includes("correct_answer")));
  assert.ok(validateItem({ ...stageOneItems[0], ai_answer: "Z" }).some((error) => error.includes("ai_answer")));
  assert.ok(validateItem({ ...stageOneItems[0], ai_correct: false }).some((error) => error.includes("ai_correct")));
});

test("unapproved fixtures are allowed in test mode and blocked in real mode", () => {
  assert.equal(validateItem(stageOneItems[0], { mode: "test" }).length, 0);
  assert.ok(validateItem(stageOneItems[0], { mode: "real" }).some((error) => error.includes("unapproved")));
});

test("developer fixtures require string source and ambiguity notes", () => {
  for (const item of stageOneItems) {
    assert.equal(typeof item.source_notes, "string");
    assert.equal(typeof item.ambiguity_notes, "string");
  }
  assert.ok(validateItem({ ...stageOneItems[0], source_notes: undefined }).some((error) => error.includes("source_notes")));
  assert.ok(validateItem({ ...stageOneItems[0], ambiguity_notes: null }).some((error) => error.includes("ambiguity_notes")));
  assert.equal(validateItem({ ...stageOneItems[0], source_notes: "", ambiguity_notes: "" }, { mode: "test" }).length, 0);
});

test("practice records are excluded from primary analysis", () => {
  const records = [{ trial_type: "practice" }, { trial_type: "experimental" }];
  assert.deepEqual(primaryAnalysisTrials(records), [{ trial_type: "experimental" }]);
});
