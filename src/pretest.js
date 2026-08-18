import { assignCondition } from "./conditions.js";
import { downloadText, sessionToJson, trialsToCsv } from "./export.js";
import { buildPretestPresentation, buildPretestRecord, PRETEST_MATERIAL, PRETEST_RATING_FIELDS } from "./pretest_data.js";
import { buildRemotePayload, dataPipeUploadTrial, submissionResultHtml, uploadSucceeded } from "./pretest_remote_storage.js";

const STUDY_VERSION = "0.2.0-prototype";

function anonymousId(prefix) {
  if (globalThis.crypto?.randomUUID) return `${prefix}_${crypto.randomUUID()}`;
  if (globalThis.crypto?.getRandomValues) {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return `${prefix}_${[...bytes].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
  }
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
  })[character]);
}

function ratingSelect(name, question, low, high) {
  const options = Array.from({ length: 7 }, (_, index) => {
    const value = index + 1;
    return `<option value="${value}">${value}</option>`;
  }).join("");
  return `<label class="rating-question" for="${name}"><strong>${question}</strong></label>
    <div class="scale-anchors"><span>1 = ${low}</span><span>7 = ${high}</span></div>
    <select id="${name}" name="${name}" required>
      <option value="" selected disabled>Select a rating</option>${options}
    </select>`;
}

const assignment = assignCondition(window.location.search);
const presentation = buildPretestPresentation(assignment.condition);
const advice = presentation.advice;
const session = {
  participant_id: anonymousId("pretest_participant"),
  session_id: anonymousId("pretest_session"),
  condition: assignment.condition,
  condition_assignment_method: assignment.method,
  study_version: STUDY_VERSION,
  study_phase: "manipulation_pretest",
  data_type: "test",
  storage_mode: "local_export",
  pretest_start_time: new Date().toISOString(),
  completed: false
};
let record = null;
let remoteUploadSucceeded = false;

const jsPsych = initJsPsych({ display_element: "pretest-target" });

const timeline = [
  {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<section class="study-card"><p class="fixture-label">Developer-only manipulation pretest — not validated research material</p><h1>AI response wording pretest</h1><p>You will read one predefined AI response and rate how it appears. Do not enter personal information.</p></section>`,
    choices: ["Begin"]
  },
  {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<section class="study-card ai-advice"><p class="fixture-label">Predefined AI response</p><h2>Scenario</h2><p>${escapeHtml(presentation.scenario)}</p><h2>Question</h2><p>${escapeHtml(presentation.question)}</p><h2>AI response</h2><p>${escapeHtml(advice.message)}</p></section>`,
    choices: ["Rate this response"]
  },
  {
    type: jsPsychSurveyHtmlForm,
    html: `<section class="study-card"><h2>Rate the AI response</h2>
      ${ratingSelect("perceived_ai_confidence", "How confident did the AI appear?", "Not at all confident", "Extremely confident")}
      ${ratingSelect("perceived_clarity", "How clear was the AI response?", "Not at all clear", "Extremely clear")}
      ${ratingSelect("perceived_knowledge", "How knowledgeable did the AI appear?", "Not at all knowledgeable", "Extremely knowledgeable")}
      ${ratingSelect("perceived_persuasiveness", "How persuasive did the AI response appear?", "Not at all persuasive", "Extremely persuasive")}
    </section>`,
    button_label: "Save ratings",
    on_finish: (data) => {
      record = buildPretestRecord({
        participant_id: session.participant_id,
        session_id: session.session_id,
        condition: session.condition,
        condition_assignment_method: session.condition_assignment_method,
        study_version: session.study_version,
        pretest_material_id: PRETEST_MATERIAL.id,
        material_status: PRETEST_MATERIAL.material_status,
        prompt_context: presentation.scenario,
        prompt_question: presentation.question,
        ai_answer: PRETEST_MATERIAL.ai_answer,
        shared_reasoning: PRETEST_MATERIAL.shared_reasoning,
        ai_message: advice.message,
        ai_confidence_language: advice.confidence_language,
        response_time_ms: data.rt,
        response_timestamp: new Date().toISOString()
      }, Object.fromEntries(PRETEST_RATING_FIELDS.map((field) => [field, data.response[field]])));
    }
  },
  {
    ...dataPipeUploadTrial({
      pluginType: jsPsychPipe,
      sessionId: session.session_id,
      getPayload: () => {
        session.completed = true;
        session.pretest_end_time ??= new Date().toISOString();
        return buildRemotePayload(session, record);
      },
      onFinish: (data) => {
        remoteUploadSucceeded = uploadSucceeded(data);
        if (!remoteUploadSucceeded) console.error("DataPipe pretest upload failed", data.result);
      }
    })
  },
  {
    type: jsPsychHtmlButtonResponse,
    stimulus: () => submissionResultHtml(remoteUploadSucceeded),
    choices: ["Finish"],
    on_load: () => {
      if (remoteUploadSucceeded) return;
      const localSession = () => ({ ...session, storage_mode: "local_export", record });
      document.getElementById("download-pretest-json").addEventListener("click", () => downloadText(
        `${session.session_id}.json`, sessionToJson(localSession()), "application/json"
      ));
      document.getElementById("download-pretest-csv").addEventListener("click", () => downloadText(
        `${session.session_id}.csv`, trialsToCsv([record]), "text/csv"
      ));
    }
  }
];

jsPsych.run(timeline);
