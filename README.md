# When AI Sounds Certain

**A Human–AI Interaction study of confidence cues and reliance on incorrect AI advice**

This independent research project investigates whether the way an AI expresses confidence changes how people respond to incorrect advice.

The central research question is:

> **Does confident AI language increase users' reliance on incorrect AI advice?**

Rather than evaluating model accuracy alone, the project focuses on the interaction between **AI communication style and human decision-making**, particularly when users must decide whether to retain their own judgment or follow an AI recommendation.



## Research Question

The project examines whether linguistic confidence cues influence reliance on AI advice when the substantive answer and reasoning are held constant.

The experimental manipulation compares:

- **High-confidence AI framing**
- **Calibrated-confidence AI framing**

The primary behavioral outcome is **harmful reliance**:

> initially correct human judgment  
> → incorrect AI advice  
> → switch to the AI's incorrect answer

This allows the study to distinguish between appropriate resistance to incorrect AI advice and potentially harmful over-reliance.



## Experimental Design

The planned study uses a **between-subjects behavioral experiment**.

Participants first make an independent judgment, then receive predefined AI-style advice, and finally make a second decision.

The experiment records:

- initial answer;
- initial confidence;
- AI advice condition;
- final answer;
- response time;
- advice adoption or rejection;
- final decision accuracy.

AI responses are **pre-scripted rather than generated live**, allowing the substantive reasoning and correctness of the advice to be controlled across experimental conditions.



## Reasoning Task Domains

The experimental materials span four reasoning domains:

1. **Logical reasoning**
2. **Evidence and information evaluation**
3. **Quantitative and risk reasoning**
4. **Text and argument evaluation**

Detailed item content, answer keys, AI-correctness assignments, and full pretest materials are withheld from the public repository while materials screening and data collection are ongoing.



## Research Development Pipeline

| Stage | Purpose | Status |
|---|---|---|
| Stage A | Item development, ambiguity checks, distractor and wording audits | ✅ Completed |
| Stage B | Baseline item difficulty and option-choice screening | 🔄 In progress |
| Stage C | Incorrect-AI advice plausibility screening | 🔄 In progress |
| Stage D | Confidence-language manipulation validation | 🔄 In progress |
| Final item selection | Freeze 12 experimental items | Planned |
| Preregistration | Freeze hypotheses and analysis plan | Planned |
| Main pilot | Human–AI reliance experiment | Planned |
| Analysis | Mixed-effects behavioral analysis | Planned |



## Current Status

**Stage A material development is complete.**

A multi-stage materials-development process was used to audit:

- answer uniqueness;
- distractor functionality;
- reasoning-mechanism overlap;
- answer-position balance;
- epistemic wording cues;
- consistency between scripted AI advice and the intended reasoning error.

The active candidate set has now been frozen for formal item screening.

Stage B/C screening and Stage D manipulation validation are currently in progress.



## Implementation

The experimental workflow is implemented as a browser-based study using:

- **JavaScript**
- **jsPsych 8**
- **HTML / CSS**
- structured **JSON and CSV** data export
- **DataPipe / OSF** for research-data storage
- automated tests for experimental logic and data structure

The implementation supports:

- between-subjects condition assignment;
- controlled scripted AI advice;
- response-time recording;
- confidence ratings;
- trial-level behavioral outcomes;
- pseudo-randomized item sequences;
- structured research-data schemas.



## Primary Behavioral Outcome

The primary outcome is **harmful reliance**.

A harmful-reliance trial occurs when:

1. the participant's initial answer is correct;
2. the AI advice is incorrect; and
3. the participant changes to the incorrect AI recommendation.

Secondary outcomes include:

- AI advice adoption;
- resistance to incorrect advice;
- corrective switching;
- final decision accuracy;
- confidence calibration.



## Planned Analysis

The confirmatory analysis focuses on trials in which:

1. the participant's initial answer is correct; and
2. the AI advice is incorrect.

The primary trial-level outcome is whether the participant subsequently follows the incorrect AI recommendation.

The planned analysis uses a mixed-effects logistic model with participant- and item-level random effects.

A simplified specification is:

```text
followed_incorrect_AI ~ confidence_condition
                      + initial_confidence
                      + trial_position
                      + (1 | participant)
                      + (1 | item)
```

Additional analyses will examine advice adoption, resistance, final accuracy, and pre-specified item-level sensitivity checks.

---

## Repository Structure

The current repository contains the browser-based research prototype, experimental logic, validation utilities, tests, and analysis infrastructure.

```text
when-ai-sounds-certain/
│
├── README.md
├── LICENSE
├── CHANGELOG.md
│
├── analysis/
│
├── src/
│   ├── conditions.js
│   ├── consent.js
│   ├── experiment.js
│   ├── export.js
│   ├── items.js
│   ├── metrics.js
│   ├── post_task.js
│   ├── pretest.js
│   ├── pretest_data.js
│   ├── pretest_remote_storage.js
│   ├── styles.css
│   └── validation.js
│
├── tests/
│
├── index.html
├── pretest.html
├── study_spec.md
├── package.json
└── package-lock.json
```

The repository structure will continue to evolve as formal screening, preregistration, and the main behavioral pilot are completed.

---

## Technical Notes

The current prototype uses:

- jsPsych `8.2.2`
- jsPsych HTML Button Response plugin
- jsPsych Survey HTML Form plugin
- plain JavaScript ES modules
- Node's built-in test runner

To run the current development version locally:

```bash
npm install
npm test
npm start
```

Then open:

```text
http://localhost:8000/
```

Some parts of the repository remain development-facing and may change as the study moves from materials screening to the main experimental implementation.

---

## Research Integrity and Open Materials

This repository is maintained as a public research portfolio and implementation record.

To protect ongoing materials screening and later participant data collection, the public repository currently excludes:

- complete experimental item banks;
- answer keys;
- final AI-correctness assignments;
- full incorrect-advice stimulus banks;
- internal reviewer feedback;
- participant-level research data.

These materials may be released after data collection and analysis where appropriate.

The project does not use a live LLM during the experiment. AI-style advice is pre-scripted to support experimental control.

---

## Ethics and Data Handling

This is an independent research project.

Participation in pretests and later behavioral studies is voluntary. The experimental implementation is designed to minimize collection of identifying information.

Research data are stored in structured form, with development, pretest, and main-study data separated by study phase.

Participants exposed to item-screening or manipulation-pretest materials are not intended to be reused in the main behavioral pilot.

---

## Project Status

**Independent research project — ongoing (2026).**

The project is currently in the experimental-material screening and manipulation-validation stage.

No confirmatory claim is made about the effect of AI confidence language before completion of the main behavioral pilot and planned analysis.

**Ruoxi Wang**  
MSc Engineering and Education, University College London

---

## Research Areas

**Human–AI Interaction · AI Reliance · Trust Calibration · Behavioral AI Evaluation · AI Communication · Decision-Making**
