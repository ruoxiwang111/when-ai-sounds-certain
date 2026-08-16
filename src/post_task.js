import { ETHICS_DRAFT_LABEL } from "./consent.js";

export const manipulationCheckHtml = `
  <section class="study-card">
    <h2>AI confidence</h2>
    <label>How confident did the AI appear overall?
      <select name="perceived_ai_confidence" required>
        <option value="" selected disabled>Select 1–7</option>
        ${[1, 2, 3, 4, 5, 6, 7].map((n) => `<option value="${n}">${n}</option>`).join("")}
      </select>
    </label>
    <p class="scale-anchors"><span>1 = Not at all confident</span><span>7 = Extremely confident</span></p>
  </section>`;

export const trustHtml = `
  <section class="study-card">
    <h2>General trust</h2>
    <label>How much did you trust the AI's advice overall?
      <select name="general_ai_trust" required>
        <option value="" selected disabled>Select 1–7</option>
        ${[1, 2, 3, 4, 5, 6, 7].map((n) => `<option value="${n}">${n}</option>`).join("")}
      </select>
    </label>
    <p class="scale-anchors"><span>1 = Not at all</span><span>7 = Completely</span></p>
  </section>`;

export const openQuestionsHtml = `
  <section class="study-card">
    <h2>Optional reflections</h2>
    <label>Think about an occasion when you followed the AI's advice. What influenced your decision?
      <textarea name="acceptance_reason" rows="4"></textarea>
    </label>
    <label>Think about an occasion when you rejected the AI's advice. What influenced your decision?
      <textarea name="rejection_reason" rows="4"></textarea>
    </label>
    <p>Do not enter names or other personal information.</p>
  </section>`;

export const debriefHtml = `
  <section class="study-card">
    <p class="draft-label">${ETHICS_DRAFT_LABEL}</p>
    <h2>Draft debrief</h2>
    <p>Some predefined AI recommendations in this technical test were intentionally incorrect. The project examines whether confidence wording affects reliance.</p>
    <p>No live AI generated the advice, and the developer fixtures must not be treated as reliable real-world guidance or research evidence.</p>
    <p>No direct personal identifiers were intentionally collected. Withdrawal and researcher contact procedures remain to be approved before recruitment.</p>
  </section>`;
