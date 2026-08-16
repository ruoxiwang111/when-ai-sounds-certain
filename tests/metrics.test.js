import test from "node:test";
import assert from "node:assert/strict";
import { calculateMetrics, METRIC_FIELDS } from "../src/metrics.js";

const result = (changes = {}) => calculateMetrics({
  initial_answer: "C", final_answer: "C", correct_answer: "C", ai_answer: "B",
  initial_confidence: 40, final_confidence: 60, ...changes
});

test("harmful switch is true only for correct-to-incorrect-AI switching", () => {
  assert.equal(result({ final_answer: "B" }).harmful_switch, true);
  assert.equal(result().harmful_switch, false);
  assert.equal(result({ initial_answer: "A", final_answer: "B" }).harmful_switch, false);
});

test("beneficial switch detects incorrect-to-correct-AI switching", () => {
  assert.equal(result({ initial_answer: "A", ai_answer: "C" }).beneficial_switch, true);
  assert.equal(result({ ai_answer: "C" }).beneficial_switch, false);
});

test("adoption, reliance, and underreliance metrics follow definitions", () => {
  assert.equal(result({ final_answer: "B" }).incorrect_ai_adoption, true);
  assert.equal(result({ ai_answer: "C" }).correct_ai_adoption, true);
  assert.equal(result().appropriate_reliance, true);
  assert.equal(result({ final_answer: "B" }).appropriate_reliance, false);
  assert.equal(result({ ai_answer: "C", final_answer: "A" }).underreliance, true);
});

test("confidence and accuracy changes handle negative, zero, and positive values", () => {
  assert.equal(result().confidence_change, 20);
  assert.equal(result({ initial_confidence: 60, final_confidence: 40 }).confidence_change, -20);
  assert.equal(result({ initial_confidence: 50, final_confidence: 50 }).confidence_change, 0);
  assert.equal(result({ final_answer: "B" }).accuracy_change, -1);
  assert.equal(result({ initial_answer: "A", final_answer: "C" }).accuracy_change, 1);
  assert.equal(result({ initial_answer: "A", final_answer: "A" }).accuracy_change, 0);
});

test("metrics contain no overreliance field", () => {
  assert.equal(METRIC_FIELDS.includes("overreliance"), false);
  assert.equal(Object.hasOwn(result(), "overreliance"), false);
});
