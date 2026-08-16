export const ETHICS_DRAFT_LABEL = "DRAFT — NOT ETHICS APPROVED";

export const landingHtml = `
  <section class="study-card">
    <h1>When AI Sounds Certain</h1>
    <p>This is a developer-test research prototype. Do not enter personal information.</p>
    <p>No responses are uploaded. Test data remain in this browser until you download them.</p>
  </section>`;

export const informationHtml = `
  <section class="study-card">
    <h2>Draft study information</h2>
    <p>This technical test asks you to answer two logic questions, view predefined AI advice, and reconsider your answers.</p>
    <p>The materials are developer fixtures and are not validated research items.</p>
  </section>`;

export const consentHtml = `
  <section class="study-card">
    <p class="draft-label">${ETHICS_DRAFT_LABEL}</p>
    <h2>Draft consent</h2>
    <p>This screen exists only to test the application flow. It is not approved consent language.</p>
    <label><input type="checkbox" name="consent_acknowledged" value="yes" required> I understand this is a developer test and will not enter personal information.</label>
  </section>`;
