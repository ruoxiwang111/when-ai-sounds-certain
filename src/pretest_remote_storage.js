export const DATAPIPE_EXPERIMENT_ID = "8xg76M2ReG1l";
export const REMOTE_STORAGE_MODE = "datapipe_remote";

export const REQUIRED_REMOTE_FIELDS = Object.freeze([
  "participant_id",
  "session_id",
  "condition",
  "condition_assignment_method",
  "study_version",
  "study_phase",
  "data_type",
  "storage_mode",
  "pretest_start_time",
  "completed",
  "pretest_end_time",
  "record"
]);

export function remoteFilename(sessionId) {
  if (!sessionId || typeof sessionId !== "string") throw new Error("A session_id is required.");
  return `${sessionId}.json`;
}

export function buildRemotePayload(session, record) {
  const payload = {
    ...session,
    storage_mode: REMOTE_STORAGE_MODE,
    record: { ...record, storage_mode: REMOTE_STORAGE_MODE }
  };
  const missing = REQUIRED_REMOTE_FIELDS.filter((field) => payload[field] === undefined || payload[field] === null);
  if (missing.length) throw new Error(`Remote pretest payload is missing: ${missing.join(", ")}`);
  return payload;
}

export function dataPipeUploadTrial({ pluginType, sessionId, getPayload, onFinish }) {
  return {
    type: pluginType,
    action: "save",
    experiment_id: DATAPIPE_EXPERIMENT_ID,
    filename: remoteFilename(sessionId),
    data_string: () => JSON.stringify(getPayload(), null, 2),
    wait_message: `<section class="study-card" role="status"><h2>Submitting data...</h2><p>Please keep this page open while your response is securely transferred.</p></section>`,
    data: { stage: "datapipe_upload" },
    on_finish: onFinish
  };
}

export function uploadSucceeded(trialData) {
  return trialData?.success === true
    && trialData?.result?.message === "Success"
    && !trialData?.result?.error;
}

export function submissionResultHtml(success) {
  if (success) {
    return `<section class="study-card"><h2>Your response has been submitted successfully.</h2><p>Thank you. You do not need to download a file.</p></section>`;
  }
  return `<section class="study-card"><h2>We could not submit your response.</h2><p>Your response has not been lost. Please download the local backup files below and keep them until the researcher provides further instructions.</p><div class="download-actions"><button id="download-pretest-json" class="jspsych-btn" type="button">Download JSON backup</button><button id="download-pretest-csv" class="jspsych-btn" type="button">Download CSV backup</button></div></section>`;
}
