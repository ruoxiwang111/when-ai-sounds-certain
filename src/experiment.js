import { stageOneItems } from "./items.js";
import { assignCondition, buildAdvice } from "./conditions.js";
import { calculateMetrics } from "./metrics.js";
import { assertValidItems } from "./validation.js";
import { landingHtml, informationHtml, consentHtml } from "./consent.js";
import { manipulationCheckHtml, trustHtml, openQuestionsHtml, debriefHtml } from "./post_task.js";
import { downloadText, labelTestRecord, sessionToJson, trialsToCsv } from "./export.js";

const STUDY_VERSION = "0.2.0-prototype";
const CONSENT_VERSION = "stage1-draft-1";
const DEBRIEF_VERSION = "stage1-draft-1";

function anonymousId(prefix) {
  if (globalThis.crypto?.randomUUID) return `${prefix}_${crypto.randomUUID()}`;
  if (globalThis.crypto?.getRandomValues) {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return `${prefix}_${[...bytes].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
  }
  // Last-resort compatibility fallback for old test browsers; not suitable as a security identifier.
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
  })[character]);
}

function answerForm(item, phase) {
  const legend = phase === "initial" ? "Choose your initial answer" : "Choose your final answer";
  const options = Object.entries(item.options).map(([key, text]) => `
    <label class="answer-option">
      <input type="radio" name="${phase}_answer" value="${key}" required>
      <span><strong>${key}.</strong> ${escapeHtml(text)}</span>
    </label>`).join("");
  return `<section class="study-card"><p class="fixture-label">Developer-only fixture — not validated research material</p>
    <h2>${escapeHtml(item.question)}</h2><fieldset><legend>${legend}</legend>${options}</fieldset></section>`;
}

function confidenceForm(phase) {
  const label = phase === "initial" ? "How confident are you in your initial answer?" : "How confident are you in your final answer?";
  return `<section class="study-card"><h2>${label}</h2>
    <label class="slider-label"><span>0 = Not at all confident</span><output id="${phase}-value">50</output><span>100 = Completely confident</span></label>
    <input class="confidence-slider" type="range" min="0" max="100" value="50" name="${phase}_confidence"
      oninput="document.getElementById('${phase}-value').value=this.value">
    <label class="confirm-rating"><input type="checkbox" name="${phase}_confidence_confirmed" value="yes" required> I have actively set or confirmed this rating.</label>
  </section>`;
}

assertValidItems(stageOneItems, { mode: "test" });

const assignment = assignCondition(window.location.search);
const participant = {
  participant_id: anonymousId("participant"),
  session_id: anonymousId("session"),
  condition: assignment.condition,
  condition_assignment_method: assignment.method,
  study_version: STUDY_VERSION,
  experiment_start_time: new Date().toISOString(),
  completed: false,
  data_type: "test",
  storage_mode: "local_export",
  consent_version: CONSENT_VERSION,
  debrief_version: DEBRIEF_VERSION
};
const trialRecords = [];
const postTask = {};

const jsPsych = initJsPsych({
  display_element: "jspsych-target",
  on_finish: () => { participant.experiment_end_time = new Date().toISOString(); }
});

const buttonScreen = (stimulus, button = "Continue") => ({
  type: jsPsychHtmlButtonResponse,
  stimulus,
  choices: [button]
});

function createItemTimeline(item, experimentalNumber = null) {
  const state = {};
  const advice = buildAdvice(item, participant.condition);
  return [
    {
      type: jsPsychSurveyHtmlForm,
      html: () => answerForm(item, "initial"),
      button_label: "Continue",
      data: { stage: "initial_answer", question_id: item.id },
      on_finish: (data) => {
        state.initial_answer = data.response.initial_answer;
        state.initial_response_time_ms = data.rt;
      }
    },
    {
      type: jsPsychSurveyHtmlForm,
      html: () => confidenceForm("initial"),
      button_label: "View AI advice",
      data: { stage: "initial_confidence", question_id: item.id },
      on_finish: (data) => { state.initial_confidence = Number(data.response.initial_confidence); }
    },
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `<section class="study-card ai-advice"><p class="fixture-label">Predefined AI advice</p><h2>AI advice</h2><p>${escapeHtml(advice.message)}</p></section>`,
      choices: ["Continue"],
      data: { stage: "ai_advice", question_id: item.id },
      on_load: () => { state.aiAdviceShownAt = performance.now(); }
    },
    {
      type: jsPsychSurveyHtmlForm,
      html: () => answerForm(item, "final"),
      button_label: "Continue",
      data: { stage: "final_answer", question_id: item.id },
      on_finish: (data) => {
        state.final_answer = data.response.final_answer;
        state.final_response_time_ms = data.rt;
        state.post_advice_decision_time_ms = Math.round(performance.now() - state.aiAdviceShownAt);
      }
    },
    {
      type: jsPsychSurveyHtmlForm,
      html: () => confidenceForm("final"),
      button_label: "Save response",
      data: { stage: "final_confidence", question_id: item.id },
      on_finish: (data) => {
        state.final_confidence = Number(data.response.final_confidence);
        const record = labelTestRecord({
          ...participant,
          experiment_end_time: undefined,
          completed: undefined,
          item_record_index: trialRecords.length,
          experimental_trial_number: experimentalNumber,
          question_id: item.id,
          trial_type: item.trial_type,
          question_category: item.category,
          question_text: item.question,
          correct_answer: item.correct_answer,
          ai_answer: item.ai_answer,
          ai_correct: item.ai_correct,
          ai_message: advice.message,
          ai_confidence_language: advice.confidence_language,
          initial_answer: state.initial_answer,
          initial_confidence: state.initial_confidence,
          initial_response_time_ms: state.initial_response_time_ms,
          post_advice_decision_time_ms: state.post_advice_decision_time_ms,
          evidence_available: false,
          evidence_opened: false,
          evidence_open_time_ms: null,
          evidence_view_duration_ms: null,
          final_answer: state.final_answer,
          final_confidence: state.final_confidence,
          final_response_time_ms: state.final_response_time_ms,
          trial_timestamp: new Date().toISOString(),
          ...calculateMetrics({
            initial_answer: state.initial_answer,
            final_answer: state.final_answer,
            correct_answer: item.correct_answer,
            ai_answer: item.ai_answer,
            initial_confidence: state.initial_confidence,
            final_confidence: state.final_confidence
          })
        });
        delete record.experiment_end_time;
        delete record.completed;
        trialRecords.push(record);
      }
    }
  ];
}

const [practiceItem, experimentalItem] = stageOneItems;
const timeline = [
  buttonScreen(landingHtml, "Begin developer test"),
  buttonScreen(informationHtml),
  {
    type: jsPsychSurveyHtmlForm,
    html: consentHtml,
    button_label: "Continue",
    data: { stage: "draft_consent" }
  },
  buttonScreen(`<section class="study-card"><h2>Anonymous test session created</h2><p>Participant and session identifiers were generated locally. Refreshing creates a new session.</p></section>`),
  buttonScreen(`<section class="study-card"><h2>Instructions</h2><p>For each developer fixture, choose an answer and rate confidence, view predefined AI advice, then choose a final answer and confidence.</p><p>All four responses are required. The practice fixture is excluded from primary-outcome analysis.</p></section>`),
  ...createItemTimeline(practiceItem),
  ...createItemTimeline(experimentalItem, 1),
  {
    type: jsPsychSurveyHtmlForm,
    html: manipulationCheckHtml,
    button_label: "Continue",
    on_finish: (data) => { postTask.perceived_ai_confidence = Number(data.response.perceived_ai_confidence); }
  },
  {
    type: jsPsychSurveyHtmlForm,
    html: trustHtml,
    button_label: "Continue",
    on_finish: (data) => { postTask.general_ai_trust = Number(data.response.general_ai_trust); }
  },
  {
    type: jsPsychSurveyHtmlForm,
    html: openQuestionsHtml,
    button_label: "Continue",
    on_finish: (data) => Object.assign(postTask, {
      acceptance_reason: data.response.acceptance_reason ?? "",
      rejection_reason: data.response.rejection_reason ?? ""
    })
  },
  buttonScreen(debriefHtml),
  {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<section class="study-card"><h2>Technical test complete</h2><p>Download the complete session as JSON and trial-level records as CSV. Both files contain test data only.</p><div class="download-actions"><button id="download-json" class="jspsych-btn" type="button">Download test JSON</button><button id="download-csv" class="jspsych-btn" type="button">Download trial CSV</button></div></section>`,
    choices: ["Finish"],
    on_load: () => {
      participant.completed = true;
      participant.experiment_end_time = new Date().toISOString();
      const completeSession = () => ({ ...participant, ...postTask, trials: trialRecords });
      document.getElementById("download-json").addEventListener("click", () => downloadText(
        `${participant.session_id}.json`, sessionToJson(completeSession()), "application/json"
      ));
      document.getElementById("download-csv").addEventListener("click", () => downloadText(
        `${participant.session_id}-trials.csv`, trialsToCsv(trialRecords), "text/csv"
      ));
    }
  }
];

jsPsych.run(timeline);
