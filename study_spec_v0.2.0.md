# Study Specification

## Project Title

**When AI Sounds Certain: Does Confident Language Increase Reliance on Incorrect AI Advice?**

中文题目：

**当 AI 表现得很确定时：高自信语言是否会增加用户对错误建议的依赖？**

---

## Document Control

- **Study version:** `0.2.0-prototype`
- **Status:** Authoritative research and implementation specification
- **Current phase:** Technical prototype and feasibility development
- **Data permitted during development:** Test and simulated data only
- **Formal recruitment status:** Not yet authorised

This version incorporates explicit requirements for pilot power, data storage, incomplete disclosure, manipulation validation, item pretesting, and non-duplicated outcome variables.

---

## 1. Purpose of This Document

This file is the authoritative research and implementation specification for the project.

All coding agents, including Codex, must treat this document as the primary source of truth. Code, tests, experimental materials, analysis scripts, documentation, and deployment settings must remain consistent with it.

When implementation decisions conflict with this document, this document takes priority unless the project owner explicitly approves a revision.

Codex must not silently modify:

- the research question;
- the experimental conditions;
- approved item wording;
- correct answers;
- AI-recommended answers;
- outcome definitions;
- data-field meanings;
- privacy constraints;
- the distinction between simulated and real data.

Any proposed change to these elements must be reported before implementation.

---

## 2. Project Status

Current status:

- Research prototype and portfolio project.
- Initial implementation should use simulated data and developer testing.
- No live large language model API is used.
- AI advice is predefined and deterministic.
- No real participant data should be committed to GitHub.
- Formal participant recruitment must not begin until the study materials, ethics requirements, consent process, data storage, and institutional requirements have been reviewed.

The first implementation is a minimum viable research prototype, not a completed causal study.

---

## 3. Research Question

### Primary research question

> Does confident language increase users’ reliance on incorrect AI advice?

### Operational version

> When the substantive content and recommended answer are held constant, are users more likely to adopt incorrect AI advice when it is expressed using highly confident language rather than calibrated language?

### Secondary exploratory questions

1. Does confident AI language increase the probability that a participant changes an initially correct answer to the AI’s incorrect answer?
2. Does confident AI language increase overall advice adoption?
3. Does confident AI language affect users’ confidence in their final answers?
4. Does confident AI language affect perceived trust in the AI?
5. Does confident AI language affect whether users inspect supporting evidence?
6. What reasons do users give for accepting or rejecting AI advice?

The prototype should prioritize the primary research question. Secondary questions must not introduce additional experimental manipulations in the first version.

---

## 4. Theoretical Focus

The project concerns Human–AI Interaction, especially:

- reliance on AI advice;
- overreliance;
- confidence signalling;
- uncertainty communication;
- trust calibration;
- user decision revision;
- evidence-checking behaviour;
- human judgement under AI assistance;
- safety implications of confidently expressed incorrect advice.

The study does not attempt to evaluate a real AI model’s factual accuracy. It evaluates how the wording of AI confidence influences user behaviour under controlled conditions.

---

## 5. Feasibility-Pilot Scope and Statistical Power

The initial portfolio study is a **feasibility pilot**, not a fully powered confirmatory experiment.

The primary outcome, `harmful_switch`, is eligible only when:

1. the participant initially answered correctly; and
2. the AI recommendation was incorrect.

Because only six of the twelve experimental trials contain incorrect AI advice, and participants will not answer every one of those trials correctly at baseline, each participant may contribute only a small number of eligible trials. Some participants may contribute no eligible trials.

The pilot should therefore estimate:

- baseline item accuracy;
- eligible harmful-switch trials per participant;
- the number of participants with zero eligible trials;
- harmful-switch and incorrect-advice-adoption frequencies;
- manipulation-check differences;
- participant-level and item-level variation;
- missing-data patterns;
- parameters for a later simulation-based power analysis.

No confirmatory sample-size target should be invented before pilot estimates or a justified simulation-based power analysis are available.

The study must not be described as proving that confident language universally causes overreliance.

---

## 6. Experimental Design

### 5.1 Design type

The first version uses a **between-subjects design**.

Each participant is randomly assigned to exactly one condition:

- `high_confidence`
- `calibrated_confidence`

The assigned condition remains constant for the entire experiment.

A participant must not be randomly reassigned on each trial.

### 5.2 Independent variable

The independent variable is:

`ai_confidence_condition`

Allowed values:

```text
high_confidence
calibrated_confidence
```

### 5.3 Controlled elements

Across the two conditions, the following must remain identical:

- question wording;
- answer options;
- correct answer;
- AI-recommended answer;
- substantive reasoning;
- evidence content;
- interface layout;
- typography;
- AI label or avatar;
- button placement;
- information order;
- timing rules;
- number of trials.

Only the confidence wording may differ.

Codex must not add stylistic differences such as colours, icons, animations, warning symbols, or different message lengths between conditions.

---

## 7. Experimental Conditions

### 6.1 High-confidence condition

Condition identifier:

```text
high_confidence
```

Default confidence framing:

> The answer is {AI_ANSWER}. I am highly confident that the available information supports this choice.

When substantive reasoning is included:

> The answer is {AI_ANSWER}. {SHARED_REASONING} I am highly confident that the available information supports this choice.

### 6.2 Calibrated-confidence condition

Condition identifier:

```text
calibrated_confidence
```

Default confidence framing:

> The answer may be {AI_ANSWER}. I am moderately confident that the available information supports this choice.

When substantive reasoning is included:

> The answer may be {AI_ANSWER}. {SHARED_REASONING} I am moderately confident that the available information supports this choice.

### 6.3 Manipulation constraint

The two messages must contain identical substantive reasoning.

The calibrated condition must not include an additional instruction such as:

> You should verify the evidence.

That instruction would introduce a verification prompt as a second manipulation.

The first version studies confidence wording only.

### 6.4 Development override

For testing purposes, the implementation should allow a condition to be forced with a URL parameter:

```text
?condition=high_confidence
```

or:

```text
?condition=calibrated_confidence
```

In normal participant mode, condition assignment must be random.

The development override must be documented and must not be mistaken for normal random assignment.

---

## 8. Manipulation-Validation Checkpoint

The final 12-item experiment must not be frozen until the confidence-language manipulation has undergone a small material pretest.

The pretest should assess whether:

- the high-confidence message is perceived as more confident;
- both messages are understandable;
- substantive meaning remains comparable;
- one condition is not simply clearer, longer, more polite, or more persuasive;
- the calibrated condition does not become a verification reminder;
- the high-confidence condition does not sound implausibly exaggerated.

At minimum, the pretest should include:

> How confident did the AI appear?

```text
1 = Not at all confident
7 = Extremely confident
```

Optional material checks may assess clarity, perceived knowledge, and persuasiveness.

This pretest is a material-development check, not evidence for the main study hypothesis.

---

## 9. Hypotheses

### Primary hypothesis

**H1:** Participants in the `high_confidence` condition will show a higher rate of harmful switching than participants in the `calibrated_confidence` condition.

### Secondary hypotheses

**H2:** Participants in the `high_confidence` condition will be more likely to follow incorrect AI advice.

**H3:** Participants in the `high_confidence` condition will report higher perceived AI confidence.

**H4:** Participants in the `high_confidence` condition may report higher trust in the AI.

**H5:** Participants in the `high_confidence` condition may show a larger increase in confidence after receiving AI advice.

### Exploratory expectations

Evidence-checking behaviour and qualitative explanations are exploratory in the first version. No strong directional claim is required unless justified before data collection.

---

## 10. Experimental Task

### 8.1 Task format

The first version should contain:

- 2 practice items;
- 12 experimental items;
- 4 answer options per item;
- one objectively defensible correct answer per item;
- one predefined AI recommendation per item.

### 8.2 AI accuracy distribution

Among the 12 experimental items:

- 6 items should contain correct AI advice;
- 6 items should contain incorrect AI advice.

The order of experimental items should be randomized for each participant.

Practice items must always appear before experimental items.

### 8.3 Task domains

The initial item bank may include:

- basic logical reasoning;
- general factual judgement;
- information evaluation;
- simple risk interpretation;
- short text evaluation.

However, the final item set should avoid excessive heterogeneity. Item difficulty, ambiguity, required background knowledge, and reading length should be reviewed before pilot use.

### 8.4 Item approval rule

Codex may:

- format items;
- validate item structure;
- load items into the experiment;
- identify inconsistencies;
- generate clearly labelled candidate items for review.

Codex must not:

- silently rewrite approved items;
- change correct answers;
- change AI answers;
- decide that an ambiguous answer is correct without reporting the issue;
- replace an item without explicit approval.

---

## 11. Item Pretesting and Retention Criteria

Candidate items must be pretested without AI advice before the final item bank is frozen.

The item pretest should estimate:

- unassisted accuracy;
- response-time distribution;
- perceived difficulty;
- answer ambiguity;
- distractor selection;
- reading burden;
- cultural or disciplinary dependence;
- plausibility of the intended AI distractor.

Items should normally be revised or removed when:

- nearly all participants answer correctly;
- nearly all participants answer incorrectly;
- more than one answer is reasonably defensible;
- the intended AI distractor is rarely selected or appears absurd;
- specialist or culturally narrow knowledge dominates performance;
- wording or option length gives away the answer;
- response times suggest misunderstanding;
- reading burden is substantially different from the rest of the bank.

Where practical, final items should be reasonably matched on word count, option length, baseline difficulty, expected response time, and plausibility of AI reasoning.

Exact numerical retention thresholds will be set after reviewing the candidate-item distributions. Codex must not invent them.

---

## 12. Participant Flow

The required participant flow is:

```text
Landing page
→ Study information
→ Consent
→ Anonymous participant ID creation
→ Between-subject condition assignment
→ General instructions
→ Practice item 1
→ Practice item 2
→ Experimental trials 1–12 in randomized order
→ Post-task manipulation check
→ General trust measure
→ Open-ended questions
→ Optional minimal demographics
→ Debrief
→ Local data export or approved data-saving procedure
→ Completion page
```

### 9.1 Trial-level flow

Each experimental trial must follow this sequence:

```text
Question presentation
→ Initial answer
→ Initial confidence rating
→ AI advice presentation
→ Optional evidence-viewing decision
→ Final answer
→ Final confidence rating
→ Trial data saved
→ Next trial
```

### 9.2 Response requirements

Participants must not proceed without providing:

- an initial answer;
- an initial confidence rating;
- a final answer;
- a final confidence rating.

Open-ended responses may be optional in the prototype unless otherwise specified.

### 9.3 Confidence scale

Initial and final confidence should be measured on a 0–100 scale.

Anchors:

```text
0 = Not at all confident
100 = Completely confident
```

The default slider position should not automatically imply a valid response. The interface should require active engagement where technically practical.

---

## 13. Incomplete Disclosure and Ethics Review

The study involves incomplete disclosure because revealing the exact confidence manipulation and planned AI-error distribution before the task could alter participant behaviour.

Before formal recruitment:

- the incomplete-disclosure procedure must be described in the ethics application;
- consent wording must be formally reviewed;
- whether participants must be warned that some advice may be inaccurate must be determined through ethics review;
- the debrief must disclose the predefined advice, intentional errors, and confidence manipulation;
- withdrawal procedures must be specified;
- any institutionally required post-debrief withdrawal option must be implemented;
- researcher and ethics contact information must be added.

Codex must not independently finalise ethics-sensitive consent wording. Prototype consent and debrief text must be labelled:

```text
DRAFT — NOT ETHICS APPROVED
```

A direct warning that advice may be deliberately wrong could alter the behaviour being studied. The balance between disclosure and experimental validity must therefore be resolved through the researcher and formal ethics review.

---

## 14. Evidence-Viewing Feature

The prototype may include an optional button:

```text
View supporting evidence
```

This feature must behave identically across conditions.

The evidence must not reveal the condition.

The following should be recorded:

- whether evidence was opened;
- when it was opened;
- time spent viewing it, if feasible.

The evidence feature is exploratory. Its inclusion must not alter confidence wording.

If evidence materials are not ready, the first minimum viable version may omit this feature, but the omission must be documented.

---

## 15. Post-Task Measures

### 11.1 Manipulation check

Variable:

```text
perceived_ai_confidence
```

Question:

> How confident did the AI appear overall?

Scale:

```text
1 = Not at all confident
7 = Extremely confident
```

### 11.2 General trust

Variable:

```text
general_ai_trust
```

Question:

> How much did you trust the AI’s advice overall?

Scale:

```text
1 = Not at all
7 = Completely
```

### 11.3 Open-ended question: acceptance

Variable:

```text
acceptance_reason
```

Question:

> Think about an occasion when you followed the AI’s advice. What influenced your decision?

### 11.4 Open-ended question: rejection

Variable:

```text
rejection_reason
```

Question:

> Think about an occasion when you rejected the AI’s advice. What influenced your decision?

### 11.5 Optional demographics

The prototype should collect no direct identifiers.

Optional low-risk fields may include:

- broad age range;
- broad academic background;
- self-rated familiarity with AI tools;
- frequency of generative AI use.

Do not collect:

- name;
- email address;
- phone number;
- student number;
- precise address;
- IP address;
- unnecessary sensitive personal information.

Demographic collection should remain minimal and must be reviewed before real recruitment.

---

## 16. Debrief

The debrief must explain:

- some AI recommendations were intentionally incorrect;
- the study examines whether confidence wording affects reliance;
- the AI responses were predefined rather than generated live;
- participants should not interpret the advice as reliable real-world guidance;
- no direct personal identifiers were intentionally collected;
- withdrawal and contact procedures must be added before formal participant recruitment.

Prototype debrief text may use placeholders for institutional contact and ethics information.

---

## 17. Item Data Structure

Each practice or experimental item should follow this JavaScript object structure:

```javascript
{
  id: "logic_01",
  trial_type: "experimental",
  category: "logic",
  question: "Question text goes here.",
  options: {
    A: "Option A",
    B: "Option B",
    C: "Option C",
    D: "Option D"
  },
  correct_answer: "C",
  ai_answer: "B",
  ai_correct: false,
  shared_reasoning: "Substantive reasoning shown in both conditions.",
  evidence_text: "Optional supporting evidence.",
  approved: false,
  notes: "Researcher review notes."
}
```

### 13.1 Required item fields

| Field | Type | Allowed values or rule |
|---|---|---|
| `id` | string | Unique item identifier |
| `trial_type` | string | `practice` or `experimental` |
| `category` | string | Short task-category label |
| `question` | string | Final approved question text |
| `options` | object | Exactly A, B, C, and D |
| `correct_answer` | string | A, B, C, or D |
| `ai_answer` | string | A, B, C, or D |
| `ai_correct` | boolean | Must equal `ai_answer === correct_answer` |
| `shared_reasoning` | string | Identical across conditions |
| `evidence_text` | string | Optional evidence content |
| `approved` | boolean | Must be true before formal pilot use |
| `notes` | string | Researcher-facing notes |

### 13.2 Validation rules

The application must validate that:

1. Every item has a unique `id`.
2. Every item has exactly four options.
3. Option keys are exactly A, B, C, and D.
4. `correct_answer` exists in `options`.
5. `ai_answer` exists in `options`.
6. `ai_correct` matches whether `ai_answer` equals `correct_answer`.
7. Every experimental item contains non-empty shared reasoning.
8. Exactly 12 experimental items are included in the final pilot set.
9. Exactly 6 experimental items have correct AI advice.
10. Exactly 6 experimental items have incorrect AI advice.
11. Practice items are excluded from primary outcome analysis.
12. Unapproved items produce a development warning.
13. Formal participant mode should not run with unapproved items.

---

## 18. Twelve-Item Bank Template

The following entries are placeholders. They must be replaced with reviewed items before pilot recruitment.

```javascript
export const experimentalItems = [
  {
    id: "item_01",
    trial_type: "experimental",
    category: "TBD",
    question: "TBD",
    options: { A: "TBD", B: "TBD", C: "TBD", D: "TBD" },
    correct_answer: "TBD",
    ai_answer: "TBD",
    ai_correct: null,
    shared_reasoning: "TBD",
    evidence_text: "TBD",
    approved: false,
    notes: "AI advice planned to be correct."
  },
  {
    id: "item_02",
    trial_type: "experimental",
    category: "TBD",
    question: "TBD",
    options: { A: "TBD", B: "TBD", C: "TBD", D: "TBD" },
    correct_answer: "TBD",
    ai_answer: "TBD",
    ai_correct: null,
    shared_reasoning: "TBD",
    evidence_text: "TBD",
    approved: false,
    notes: "AI advice planned to be incorrect."
  },
  {
    id: "item_03",
    trial_type: "experimental",
    category: "TBD",
    question: "TBD",
    options: { A: "TBD", B: "TBD", C: "TBD", D: "TBD" },
    correct_answer: "TBD",
    ai_answer: "TBD",
    ai_correct: null,
    shared_reasoning: "TBD",
    evidence_text: "TBD",
    approved: false,
    notes: "AI advice planned to be correct."
  },
  {
    id: "item_04",
    trial_type: "experimental",
    category: "TBD",
    question: "TBD",
    options: { A: "TBD", B: "TBD", C: "TBD", D: "TBD" },
    correct_answer: "TBD",
    ai_answer: "TBD",
    ai_correct: null,
    shared_reasoning: "TBD",
    evidence_text: "TBD",
    approved: false,
    notes: "AI advice planned to be incorrect."
  },
  {
    id: "item_05",
    trial_type: "experimental",
    category: "TBD",
    question: "TBD",
    options: { A: "TBD", B: "TBD", C: "TBD", D: "TBD" },
    correct_answer: "TBD",
    ai_answer: "TBD",
    ai_correct: null,
    shared_reasoning: "TBD",
    evidence_text: "TBD",
    approved: false,
    notes: "AI advice planned to be correct."
  },
  {
    id: "item_06",
    trial_type: "experimental",
    category: "TBD",
    question: "TBD",
    options: { A: "TBD", B: "TBD", C: "TBD", D: "TBD" },
    correct_answer: "TBD",
    ai_answer: "TBD",
    ai_correct: null,
    shared_reasoning: "TBD",
    evidence_text: "TBD",
    approved: false,
    notes: "AI advice planned to be incorrect."
  },
  {
    id: "item_07",
    trial_type: "experimental",
    category: "TBD",
    question: "TBD",
    options: { A: "TBD", B: "TBD", C: "TBD", D: "TBD" },
    correct_answer: "TBD",
    ai_answer: "TBD",
    ai_correct: null,
    shared_reasoning: "TBD",
    evidence_text: "TBD",
    approved: false,
    notes: "AI advice planned to be correct."
  },
  {
    id: "item_08",
    trial_type: "experimental",
    category: "TBD",
    question: "TBD",
    options: { A: "TBD", B: "TBD", C: "TBD", D: "TBD" },
    correct_answer: "TBD",
    ai_answer: "TBD",
    ai_correct: null,
    shared_reasoning: "TBD",
    evidence_text: "TBD",
    approved: false,
    notes: "AI advice planned to be incorrect."
  },
  {
    id: "item_09",
    trial_type: "experimental",
    category: "TBD",
    question: "TBD",
    options: { A: "TBD", B: "TBD", C: "TBD", D: "TBD" },
    correct_answer: "TBD",
    ai_answer: "TBD",
    ai_correct: null,
    shared_reasoning: "TBD",
    evidence_text: "TBD",
    approved: false,
    notes: "AI advice planned to be correct."
  },
  {
    id: "item_10",
    trial_type: "experimental",
    category: "TBD",
    question: "TBD",
    options: { A: "TBD", B: "TBD", C: "TBD", D: "TBD" },
    correct_answer: "TBD",
    ai_answer: "TBD",
    ai_correct: null,
    shared_reasoning: "TBD",
    evidence_text: "TBD",
    approved: false,
    notes: "AI advice planned to be incorrect."
  },
  {
    id: "item_11",
    trial_type: "experimental",
    category: "TBD",
    question: "TBD",
    options: { A: "TBD", B: "TBD", C: "TBD", D: "TBD" },
    correct_answer: "TBD",
    ai_answer: "TBD",
    ai_correct: null,
    shared_reasoning: "TBD",
    evidence_text: "TBD",
    approved: false,
    notes: "AI advice planned to be correct."
  },
  {
    id: "item_12",
    trial_type: "experimental",
    category: "TBD",
    question: "TBD",
    options: { A: "TBD", B: "TBD", C: "TBD", D: "TBD" },
    correct_answer: "TBD",
    ai_answer: "TBD",
    ai_correct: null,
    shared_reasoning: "TBD",
    evidence_text: "TBD",
    approved: false,
    notes: "AI advice planned to be incorrect."
  }
];
```

The correct/incorrect pattern above is provisional. Final ordering is randomized, so alternating template labels do not imply participant-facing order.

---

## 19. Participant-Level Data Fields

These fields should be stored once per participant or attached consistently to all trial records.

| Field | Type | Description |
|---|---|---|
| `participant_id` | string | Anonymous generated identifier |
| `session_id` | string | Anonymous session identifier |
| `condition` | string | `high_confidence` or `calibrated_confidence` |
| `condition_assignment_method` | string | `random` or `url_override` |
| `study_version` | string | Version of experiment materials |
| `experiment_start_time` | timestamp | Session start time |
| `experiment_end_time` | timestamp | Session end time |
| `device_type` | string | Broad category only, if collected |
| `completed` | boolean | Whether full study was completed |
| `perceived_ai_confidence` | integer | 1–7 manipulation-check response |
| `general_ai_trust` | integer | 1–7 trust response |
| `acceptance_reason` | string | Open-ended response |
| `rejection_reason` | string | Open-ended response |
| `ai_familiarity` | optional integer | Self-rated AI familiarity |
| `genai_use_frequency` | optional string | Broad use-frequency category |
| `data_type` | string | `simulated`, `test`, or `real` |
| `storage_mode` | string | `local_export` or a future approved method |
| `consent_version` | string | Version of consent text |
| `debrief_version` | string | Version of debrief text |

The `data_type` field is mandatory in generated datasets.

---

## 20. Trial-Level Raw Data Fields

Each experimental item should produce one analysis-ready trial record.

| Field | Type | Description |
|---|---|---|
| `participant_id` | string | Anonymous participant identifier |
| `session_id` | string | Anonymous session identifier |
| `condition` | string | Assigned confidence condition |
| `study_version` | string | Experiment version |
| `trial_index` | integer | Position in jsPsych timeline |
| `experimental_trial_number` | integer | Experimental item position 1–12 |
| `question_id` | string | Unique item identifier |
| `trial_type` | string | `practice` or `experimental` |
| `question_category` | string | Item category |
| `question_text` | string | Question shown |
| `correct_answer` | string | A, B, C, or D |
| `ai_answer` | string | A, B, C, or D |
| `ai_correct` | boolean | Whether AI advice is correct |
| `ai_message` | string | Full message shown |
| `ai_confidence_language` | string | Condition-specific confidence phrase |
| `initial_answer` | string | Participant’s initial response |
| `initial_confidence` | number | 0–100 |
| `initial_response_time_ms` | number | Time to initial response |
| `ai_advice_view_time_ms` | number | Time spent before final answer |
| `evidence_available` | boolean | Whether evidence was available |
| `evidence_opened` | boolean | Whether evidence was opened |
| `evidence_open_time_ms` | nullable number | Time evidence was first opened |
| `evidence_view_duration_ms` | nullable number | Approximate viewing duration |
| `final_answer` | string | Participant’s final response |
| `final_confidence` | number | 0–100 |
| `final_response_time_ms` | number | Time to final response |
| `trial_timestamp` | timestamp | Trial completion time |
| `data_type` | string | `simulated`, `test`, or `real` |
| `storage_mode` | string | `local_export` or a future approved method |
| `consent_version` | string | Version of consent text |
| `debrief_version` | string | Version of debrief text |

Derived metrics described below should also be attached to each trial record.

---

## 21. Core Derived Metrics

Metric calculations must be implemented in a separate pure function and covered by unit tests.

### 17.1 Initial correctness

Variable:

```text
initial_correct
```

Definition:

```javascript
initial_correct = initial_answer === correct_answer
```

### 17.2 Final correctness

Variable:

```text
final_correct
```

Definition:

```javascript
final_correct = final_answer === correct_answer
```

### 17.3 Answer switching

Variable:

```text
switched_answer
```

Definition:

```javascript
switched_answer = initial_answer !== final_answer
```

### 17.4 Advice following

Variable:

```text
followed_ai
```

Definition:

```javascript
followed_ai = final_answer === ai_answer
```

This measure alone does not distinguish appropriate from inappropriate reliance.

### 17.5 Harmful switch

Variable:

```text
harmful_switch
```

Primary behavioural outcome.

Definition:

```javascript
harmful_switch =
  initial_answer === correct_answer &&
  ai_answer !== correct_answer &&
  final_answer === ai_answer
```

Interpretation:

The participant initially answered correctly, received incorrect AI advice, and changed to the AI’s incorrect answer.

### 17.6 Beneficial switch

Variable:

```text
beneficial_switch
```

Definition:

```javascript
beneficial_switch =
  initial_answer !== correct_answer &&
  ai_answer === correct_answer &&
  final_answer === ai_answer
```

Interpretation:

The participant initially answered incorrectly, received correct AI advice, and changed to the correct AI answer.

### 17.7 Incorrect advice adoption

Variable:

```text
incorrect_ai_adoption
```

Definition:

```javascript
incorrect_ai_adoption =
  ai_answer !== correct_answer &&
  final_answer === ai_answer
```

This includes participants who initially selected the same incorrect answer as the AI and participants who switched to it. It must therefore be distinguished from `harmful_switch`.

### 17.8 Correct advice adoption

Variable:

```text
correct_ai_adoption
```

Definition:

```javascript
correct_ai_adoption =
  ai_answer === correct_answer &&
  final_answer === ai_answer
```

### 17.9 Appropriate reliance

Variable:

```text
appropriate_reliance
```

Definition:

```javascript
appropriate_reliance =
  (
    ai_answer === correct_answer &&
    final_answer === ai_answer
  ) ||
  (
    ai_answer !== correct_answer &&
    final_answer !== ai_answer
  )
```

This is an exploratory composite measure and should not replace the primary outcome.

### Conceptual interpretation: overreliance

`overreliance` is a theoretical interpretation rather than a separately stored variable in the first version.

The stored behavioural variable is:

```text
incorrect_ai_adoption
```

It may be discussed as an indicator of overreliance when the AI recommendation is objectively incorrect. No duplicate `overreliance` column should be generated or recomputed.

### 17.11 Underreliance

Variable:

```text
underreliance
```

Definition:

```javascript
underreliance =
  ai_answer === correct_answer &&
  final_answer !== ai_answer
```

### 17.12 Confidence change

Variable:

```text
confidence_change
```

Definition:

```javascript
confidence_change = final_confidence - initial_confidence
```

### 17.13 Accuracy change

Variable:

```text
accuracy_change
```

Allowed values:

```text
-1 = correct to incorrect
 0 = no change in correctness
 1 = incorrect to correct
```

Suggested implementation:

```javascript
accuracy_change =
  Number(final_answer === correct_answer) -
  Number(initial_answer === correct_answer)
```

---

## 23. Primary and Secondary Outcomes

### Primary outcome

Participant-level harmful switch rate on trials where:

- the participant’s initial answer was correct; and
- the AI advice was incorrect.

Suggested participant-level calculation:

```text
number of harmful switches
divided by
number of eligible initially-correct, incorrect-AI trials
```

Participants with zero eligible trials require explicit handling in analysis and must not receive an invented denominator.

Analysis must report the eligible-trial denominator distribution, including the number of participants with zero eligible trials and the sensitivity of participant-level rates to sparse denominators.

### Secondary behavioural outcomes

- incorrect AI advice adoption rate;
- overall AI-following rate;
- correct AI advice adoption rate;
- appropriate reliance rate;
- beneficial switch rate;
- final accuracy;
- confidence change;
- evidence-opening rate;
- response time.

### Self-report outcomes

- perceived AI confidence;
- general trust in AI advice.

### Qualitative outcomes

Reasons for acceptance or rejection may be coded into themes such as:

- confidence of AI language;
- plausibility of explanation;
- participant’s initial uncertainty;
- assumed AI expertise;
- conflict with prior knowledge;
- convenience or time pressure;
- evidence checking;
- distrust caused by earlier errors;
- perceived task difficulty;
- reliance on personal knowledge.

These themes are provisional. Final qualitative coding should remain open to unanticipated explanations.

---

## 24. Analysis Principles

The first analysis should include:

1. Data validation.
2. Participant and trial counts.
3. Condition-assignment balance.
4. Manipulation-check comparison.
5. Harmful switch rate by condition.
6. Incorrect AI adoption rate by condition.
7. Correct advice adoption rate by condition.
8. Final accuracy by condition.
9. Confidence change by condition.
10. Trust rating by condition.
11. Evidence-opening rate by condition, if implemented.
12. Transparent reporting of missing data.
13. Clear separation of simulated, test, and real data.

### 19.1 Pilot interpretation

For a small convenience pilot, findings should be described as:

- preliminary;
- exploratory;
- feasibility-oriented;
- useful for refining items and measures.

Do not claim that a small pilot proves a general causal effect.

### 19.2 Repeated-measures structure

Each participant answers multiple items. Formal analysis should account for clustering by participant and potentially by item.

A future confirmatory analysis may use a mixed-effects logistic regression such as:

```text
harmful_switch ~ condition + initial_confidence + trial_order
with random intercepts for participant and item
```

The exact confirmatory model should be finalized before formal data collection.

---

## 26. Randomization Requirements

The implementation must:

- randomly assign participants between the two conditions;
- keep condition assignment fixed throughout the study;
- randomize the 12 experimental items;
- preserve practice-item order unless explicitly changed;
- record the presented item order;
- record whether assignment used random mode or URL override.

For a real study, the randomization method should support approximately balanced allocation.

---

## 27. Simulation Requirements

Simulated data may be created to test the analysis pipeline.

Every simulated record must include:

```text
data_type = simulated
```

Simulation must not be designed to manufacture support for the hypothesis.

Simulation scripts should:

- document assumed probabilities;
- use a fixed random seed for reproducibility;
- produce both experimental conditions;
- include realistic but clearly artificial responses;
- allow null-effect and condition-effect scenarios;
- never be presented as participant evidence.

---

## 28. Data-Storage Plan

### 28.1 Prototype phase

During prototype development:

- data remain in the browser until downloaded;
- test data may be exported locally as CSV and JSON;
- exported records must use `data_type = test`;
- local-only export is for developer testing;
- unattended real-participant recruitment is prohibited.

### 28.2 Simulated-data phase

Simulated datasets must:

- use `data_type = simulated`;
- use a reproducible seed;
- document assumptions;
- include both conditions;
- never be presented as participant evidence.

### 28.3 Real-participant phase

Before real recruitment, an approved remote storage method must be selected and documented. It must be reviewed for:

- institutional ethics requirements;
- consent-language compatibility;
- data location and access control;
- secure transfer and encryption;
- retention and deletion;
- withdrawal procedures;
- backup and recovery;
- separation of identifiers from response data.

Real recruitment must not begin while local browser download is the only storage mechanism.

No provider is selected in this version. Codex must not independently integrate Firebase, Google Sheets, Apps Script, Supabase, OSF, DataPipe, Qualtrics, Prolific, or another service.

---

## 29. Privacy and Data Rules

The prototype must not intentionally collect direct personal identifiers.

Do not collect or store:

- names;
- email addresses;
- phone numbers;
- student IDs;
- account usernames;
- precise addresses;
- IP addresses;
- unnecessary free-text personal details.

GitHub may contain:

- source code;
- study materials;
- simulated data;
- synthetic test data;
- data dictionaries;
- analysis scripts;
- aggregate or appropriately anonymized outputs, if approved.

GitHub must not contain:

- raw identifiable participant data;
- secrets;
- API keys;
- private OSF tokens;
- consent records containing identifying information.

A `.gitignore` file should exclude real-data locations and secret files.

---

## 30. Technical Requirements

Preferred implementation:

- jsPsych;
- plain JavaScript;
- HTML;
- CSS;
- static deployment;
- Python for analysis;
- GitHub for version control;
- GitHub Pages for prototype hosting.

Do not introduce unless explicitly approved:

- React;
- a live LLM API;
- a custom backend;
- user authentication;
- third-party trackers;
- analytics scripts;
- unnecessary dependencies.

The application should be understandable to a beginner and organized into small reusable modules.

---

## 31. Required Code Modules

Suggested structure:

```text
src/
├── experiment.js
├── items.js
├── conditions.js
├── metrics.js
├── validation.js
├── consent.js
├── post_task.js
└── styles.css
```

Recommended responsibilities:

- `experiment.js`: jsPsych timeline and experiment flow.
- `items.js`: practice and experimental item bank.
- `conditions.js`: confidence-condition text generation.
- `metrics.js`: pure derived-metric functions.
- `validation.js`: item-bank and data validation.
- `consent.js`: study information and consent content.
- `post_task.js`: manipulation check, trust, open questions.
- `styles.css`: shared presentation styles.

---

## 32. Required Tests

At minimum, automated tests must verify:

1. `harmful_switch` is true only in the intended case.
2. `beneficial_switch` is true only in the intended case.
3. `incorrect_ai_adoption` is calculated correctly.
4. `appropriate_reliance` is calculated correctly.
5. `confidence_change` handles increases, decreases, and no change.
6. All item IDs are unique.
7. Every item has four answer options.
8. `ai_correct` matches the answers.
9. The final bank has six correct-AI and six incorrect-AI trials.
10. Condition wording changes only the confidence framing.
11. URL overrides work in development mode.
12. Practice trials are excluded from primary analysis.
13. Required data fields are present.
14. Simulated data are labelled as simulated.

Codex must report:

- tests run;
- results;
- assumptions;
- unresolved issues.

---

## 33. User Interface Requirements

The interface should be:

- simple;
- readable;
- neutral;
- consistent across conditions;
- usable on a standard laptop;
- reasonably responsive on mobile devices;
- free from unnecessary visual persuasion.

The AI message must not appear more visually authoritative in one condition.

Avoid condition-specific:

- colour changes;
- boldness changes;
- avatars;
- badges;
- warning signs;
- animations;
- message-box sizes.

Accessibility considerations should include:

- readable font size;
- keyboard-accessible controls where feasible;
- sufficient contrast;
- visible focus states;
- descriptive button labels;
- no reliance on colour alone.

---

## 34. Versioning

The study must include a version identifier, for example:

```text
study_version = "0.2.0-prototype"
```

Increment the version when changing:

- item wording;
- AI reasoning;
- condition wording;
- task order rules;
- outcome definitions;
- measures;
- consent or debrief;
- data schema.

Material changes must be documented in a changelog.

---

## 35. Definition of the Minimum Viable Prototype

The MVP is complete when it can:

1. Display study information and consent.
2. Generate an anonymous participant ID.
3. Assign one of two conditions.
4. Run two practice items.
5. Run 12 randomized experimental items.
6. Collect initial answer and confidence.
7. Display condition-specific predefined AI advice.
8. Collect final answer and confidence.
9. Calculate and save core metrics.
10. Collect manipulation-check and trust ratings.
11. Collect two open-ended responses.
12. Display a debrief.
13. Export test data locally as CSV and JSON.
14. Run without console errors.
15. Pass all required validation and metric tests.
16. Clearly label the page as a research prototype.
17. Avoid collecting direct personal identifiers.

Data upload, real recruitment, advanced statistical modelling, and a polished public report are later phases.

---

## 37. Decisions Requiring Researcher Approval

Codex must stop and report rather than independently deciding when a task would change:

- the primary research question;
- the between-subject design;
- the number of conditions;
- confidence wording;
- the 6/6 AI accuracy balance;
- the number of experimental items;
- item correct answers;
- AI-recommended answers;
- metric definitions;
- the primary outcome;
- collection of personal information;
- external data storage;
- use of a live AI model;
- the statistical interpretation of real findings.

Minor implementation details that do not affect research validity may be handled autonomously and documented.

---

## 38. Current Researcher TODO List

Before real pilot recruitment, the researcher must:

- [ ] Complete the one-item technical MVP.
- [ ] Manually test both confidence conditions.
- [ ] Conduct a manipulation-language pretest.
- [ ] Create more than 12 candidate items.
- [ ] Pretest candidate items without AI advice.
- [ ] Estimate eligible harmful-switch trials.
- [ ] Conduct simulation-based power planning before a confirmatory study.
- [ ] Select and document an approved remote storage method.
- [ ] Obtain approval for incomplete-disclosure, consent, debrief, and withdrawal procedures.

- [ ] Draft candidate items.
- [ ] Verify every correct answer independently.
- [ ] Assess ambiguity and difficulty.
- [ ] Check that incorrect AI advice is plausible but clearly wrong.
- [ ] Match item length and reading demands.
- [ ] Finalize shared reasoning for each item.
- [ ] Decide whether evidence viewing is included.
- [ ] Review consent and debrief language.
- [ ] Confirm ethics requirements.
- [ ] Decide approved data-storage method.
- [ ] Run internal testing.
- [ ] Conduct a small usability test.
- [ ] Freeze study version before recruitment.
- [ ] Predefine the analysis plan for any confirmatory study.

---

## 39. Instruction for Codex

When asked to implement or modify this project, Codex should first:

1. Read this entire file.
2. Identify the relevant requirements.
3. State any assumptions.
4. Check whether requested changes conflict with this specification.
5. Make the smallest coherent change.
6. Add or update tests.
7. Run available tests.
8. Report modified files.
9. Report test results.
10. Report unresolved research or implementation risks.

Codex should not claim that a feature is complete unless it has been manually or automatically verified.

---

## 40. Changelog

### 0.2.0-prototype

Added:

- feasibility-pilot and statistical-power limitations;
- explicit sparse-denominator reporting;
- staged data-storage requirements;
- prohibition on real recruitment with local-only export;
- incomplete-disclosure and ethics-review requirements;
- manipulation-validation checkpoint;
- item pretesting and retention criteria;
- removal of duplicate stored `overreliance`;
- additional researcher decision gates.

Retained:

- the primary research question;
- two-condition between-subject design;
- predefined AI advice;
- six correct and six incorrect AI trials;
- `harmful_switch` as the primary safety-relevant outcome;
- one-item MVP before the full item bank.

---

## 41. Final Interpretation Boundary

This project may demonstrate the ability to:

- formulate a Human–AI Interaction question;
- define an experimental manipulation;
- build a browser-based behavioural experiment;
- collect structured behavioural data;
- operationalize reliance and overreliance;
- combine quantitative outcomes with qualitative explanations;
- build a reproducible analysis pipeline;
- discuss AI trust and safety implications.

The prototype alone cannot establish that confident AI language universally causes overreliance.

Any conclusion must remain proportional to:

- sample size;
- sample characteristics;
- item quality;
- manipulation strength;
- study setting;
- statistical uncertainty;
- whether data are simulated, pilot, or confirmatory.

