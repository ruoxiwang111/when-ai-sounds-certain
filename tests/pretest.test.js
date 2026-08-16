import test from "node:test";
import assert from "node:assert/strict";
import { buildAdvice, CONDITIONS } from "../src/conditions.js";
import { sessionToJson, trialsToCsv } from "../src/export.js";
import { buildPretestPresentation, buildPretestRecord, PRETEST_MATERIAL, PRETEST_RATING_FIELDS } from "../src/pretest_data.js";

test("pretest scenario and question are identical across conditions", () => {
  const high = buildPretestPresentation(CONDITIONS.HIGH);
  const calibrated = buildPretestPresentation(CONDITIONS.CALIBRATED);
  assert.equal(high.scenario, calibrated.scenario);
  assert.equal(high.question, calibrated.question);
  assert.equal(high.scenario, "A classification rule states that every object in category L has property P. Object X belongs to category L.");
  assert.equal(high.question, "Does Object X have property P?");
});

test("pretest conditions preserve answer and substantive reasoning", () => {
  const high = buildAdvice(PRETEST_MATERIAL, CONDITIONS.HIGH);
  const calibrated = buildAdvice(PRETEST_MATERIAL, CONDITIONS.CALIBRATED);
  assert.deepEqual(high.invariant_content, calibrated.invariant_content);
  assert.equal(high.invariant_content.ai_answer, PRETEST_MATERIAL.ai_answer);
  assert.equal(high.invariant_content.shared_reasoning, PRETEST_MATERIAL.shared_reasoning);
});

test("only the intended confidence wording differs in the pretest response", () => {
  const high = buildAdvice(PRETEST_MATERIAL, CONDITIONS.HIGH);
  const calibrated = buildAdvice(PRETEST_MATERIAL, CONDITIONS.CALIBRATED);
  assert.notEqual(high.message, calibrated.message);
  assert.equal(
    high.message.replace(`The answer is ${PRETEST_MATERIAL.ai_answer}.`, "[ANSWER_LEAD]").replace(high.confidence_language, "[CONFIDENCE]"),
    calibrated.message.replace(`The answer may be ${PRETEST_MATERIAL.ai_answer}.`, "[ANSWER_LEAD]").replace(calibrated.confidence_language, "[CONFIDENCE]")
  );
});

test("pretest record exports all four ratings and required labels", () => {
  const ratings = Object.fromEntries(PRETEST_RATING_FIELDS.map((field, index) => [field, index + 2]));
  const record = buildPretestRecord({ session_id: "pretest_session_test" }, ratings);
  for (const field of PRETEST_RATING_FIELDS) assert.equal(record[field], ratings[field]);
  assert.equal(record.data_type, "test");
  assert.equal(record.study_phase, "manipulation_pretest");

  const json = sessionToJson({ study_phase: record.study_phase, record });
  const csv = trialsToCsv([record]);
  for (const field of PRETEST_RATING_FIELDS) {
    assert.match(json, new RegExp(field));
    assert.match(csv, new RegExp(field));
  }
  assert.match(json, /"study_phase": "manipulation_pretest"/);
  assert.match(csv, /manipulation_pretest/);
});

test("pretest ratings reject missing or out-of-range values", () => {
  const ratings = Object.fromEntries(PRETEST_RATING_FIELDS.map((field) => [field, 4]));
  delete ratings.perceived_clarity;
  assert.throws(() => buildPretestRecord({}, ratings), /perceived_clarity/);
  assert.throws(() => buildPretestRecord({}, { ...ratings, perceived_clarity: 8 }), /perceived_clarity/);
});
