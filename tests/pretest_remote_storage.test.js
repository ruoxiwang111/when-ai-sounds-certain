import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { assignCondition, CONDITIONS } from "../src/conditions.js";
import {
  buildRemotePayload,
  DATAPIPE_EXPERIMENT_ID,
  dataPipeUploadTrial,
  remoteFilename,
  REQUIRED_REMOTE_FIELDS,
  submissionResultHtml,
  uploadSucceeded
} from "../src/pretest_remote_storage.js";

const completeSession = {
  participant_id: "participant_test",
  session_id: "pretest_session_123",
  condition: CONDITIONS.HIGH,
  condition_assignment_method: "random",
  study_version: "0.2.0-prototype",
  study_phase: "manipulation_pretest",
  data_type: "test",
  storage_mode: "local_export",
  pretest_start_time: "2026-08-18T00:00:00.000Z",
  completed: true,
  pretest_end_time: "2026-08-18T00:01:00.000Z"
};
const record = { session_id: completeSession.session_id, storage_mode: "local_export" };

test("DataPipe configuration uses the correct public experiment ID and save action", () => {
  const trial = dataPipeUploadTrial({ pluginType: "pipe", sessionId: completeSession.session_id, getPayload: () => ({}), onFinish: () => {} });
  assert.equal(DATAPIPE_EXPERIMENT_ID, "8xg76M2ReG1l");
  assert.equal(trial.experiment_id, DATAPIPE_EXPERIMENT_ID);
  assert.equal(trial.action, "save");
  assert.doesNotMatch(JSON.stringify(trial), /condition_assignment|api\/condition/i);
});

test("one upload trial uses a unique filename derived from session_id", () => {
  assert.equal(remoteFilename("pretest_session_123"), "pretest_session_123.json");
  assert.notEqual(remoteFilename("pretest_session_123"), remoteFilename("pretest_session_456"));
  const trial = dataPipeUploadTrial({ pluginType: "pipe", sessionId: completeSession.session_id, getPayload: () => ({}), onFinish: () => {} });
  assert.equal(trial.filename, remoteFilename(completeSession.session_id));
});

test("pretest timeline contains exactly one DataPipe upload attempt", async () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = await readFile(resolve(here, "../src/pretest.js"), "utf8");
  assert.equal(source.match(/dataPipeUploadTrial\s*\(\s*\{/g)?.length, 1);
});

test("remote payload contains every required field and remote storage metadata", () => {
  const payload = buildRemotePayload(completeSession, record);
  for (const field of REQUIRED_REMOTE_FIELDS) assert.ok(Object.hasOwn(payload, field), field);
  assert.equal(payload.storage_mode, "datapipe_remote");
  assert.equal(payload.record.storage_mode, "datapipe_remote");
});

test("browser random assignment remains the existing two-way assignment", () => {
  assert.deepEqual(assignCondition("", () => 0.1), { condition: CONDITIONS.HIGH, method: "random" });
  assert.deepEqual(assignCondition("", () => 0.9), { condition: CONDITIONS.CALIBRATED, method: "random" });
});

test("upload result selects success UI or local export fallback", () => {
  assert.equal(uploadSucceeded({ success: true, result: { message: "Success" } }), true);
  assert.match(submissionResultHtml(true), /submitted successfully/i);
  assert.doesNotMatch(submissionResultHtml(true), /download-pretest-json/);
  assert.equal(uploadSucceeded({ success: false, result: { error: "OSF_UPLOAD_ERROR" } }), false);
  assert.equal(uploadSucceeded({ success: true, result: {} }), false);
  assert.match(submissionResultHtml(false), /could not submit/i);
  assert.match(submissionResultHtml(false), /download-pretest-json/);
  assert.match(submissionResultHtml(false), /download-pretest-csv/);
});

test("client storage integration introduces no credential fields or secret headers", async () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const sources = await Promise.all([
    "../src/pretest.js",
    "../src/pretest_remote_storage.js",
    "../pretest.html"
  ].map((path) => readFile(resolve(here, path), "utf8")));
  assert.doesNotMatch(sources.join("\n"), /(?:osf[_-]?token|api[_-]?secret|password|personal[_-]?access[_-]?token|authorization\s*:)/i);
});
