import test from "node:test";
import assert from "node:assert/strict";
import { labelTestRecord, sessionToJson, trialsToCsv } from "../src/export.js";

test("test records are always labelled for local export", () => {
  assert.deepEqual(labelTestRecord({ id: 1 }), { id: 1, data_type: "test", storage_mode: "local_export" });
});

test("JSON export contains complete test-session labels", () => {
  const parsed = JSON.parse(sessionToJson({ session_id: "session_test", trials: [] }));
  assert.equal(parsed.data_type, "test");
  assert.equal(parsed.storage_mode, "local_export");
  assert.deepEqual(parsed.trials, []);
});

test("CSV export labels trials and escapes commas and quotes", () => {
  const csv = trialsToCsv([{ question_id: "q1", note: 'alpha, "beta"' }]);
  assert.match(csv, /data_type/);
  assert.match(csv, /storage_mode/);
  assert.match(csv, /test/);
  assert.match(csv, /local_export/);
  assert.match(csv, /"alpha, ""beta"""/);
});

test("empty CSV export is empty", () => assert.equal(trialsToCsv([]), ""));

test("corrected Stage 1 timing and record index names export without legacy fields", () => {
  const trial = {
    item_record_index: 0,
    experimental_trial_number: 1,
    post_advice_decision_time_ms: 1250
  };
  const csv = trialsToCsv([trial]);
  const json = sessionToJson({ trials: [trial] });
  assert.match(csv, /item_record_index/);
  assert.match(csv, /post_advice_decision_time_ms/);
  assert.doesNotMatch(csv, /trial_index/);
  assert.doesNotMatch(csv, /ai_advice_view_time_ms/);
  assert.match(json, /item_record_index/);
  assert.match(json, /post_advice_decision_time_ms/);
  assert.doesNotMatch(json, /trial_index/);
  assert.doesNotMatch(json, /ai_advice_view_time_ms/);
});
