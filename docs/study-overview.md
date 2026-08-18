# Study Overview

## Research Problem

Generative AI systems often present answers with linguistic signals of certainty. These signals may influence how users evaluate and act on AI recommendations, particularly when the advice itself is incorrect.

This project examines a simple but important Human–AI Interaction question:

> **Does confident AI language increase users' reliance on incorrect AI advice?**

The project focuses on the behavioral consequences of AI communication style rather than model accuracy alone.

## Core Idea

The study separates two components that are often confounded in real AI interactions:

1. **what the AI says**; and
2. **how confidently the AI says it**.

The substantive answer and reasoning are held constant across experimental conditions, while the confidence framing is manipulated.

This allows the study to test whether confidence cues themselves influence reliance.

## Experimental Structure

The planned main experiment follows a repeated decision-making structure:

```text
Initial judgment
      ↓
Initial confidence rating
      ↓
Pre-scripted AI advice
      ↓
Final judgment

```
Participants first answer independently before seeing AI advice.

This makes it possible to distinguish between:

retaining an initially correct judgment;
following correct AI advice;
rejecting incorrect AI advice;
switching from an incorrect initial answer to a correct AI answer;
switching from a correct initial answer to an incorrect AI answer.
Experimental Manipulation

The study uses a between-subjects manipulation of AI confidence framing.

Participants are assigned to one of two conditions:

High-confidence framing
Calibrated-confidence framing

The substantive answer, reasoning, and correctness of the AI advice are controlled across conditions.

The manipulation is therefore intended to isolate the effect of linguistic confidence rather than differences in informational content.

Primary Behavioral Outcome

The primary outcome is harmful reliance.

A harmful-reliance event occurs when:

the participant initially answers correctly;
the AI subsequently gives an incorrect recommendation; and
the participant changes to the AI's incorrect answer.

Conceptually:

```text
Correct initial judgment
        ↓
Incorrect AI advice
        ↓
Adoption of incorrect AI answer
```

This outcome captures a specific failure mode in Human–AI Interaction: a user abandons a correct independent judgment because of misleading AI advice.

Secondary Outcomes

Additional behavioral outcomes include:

overall AI-advice adoption;
resistance to incorrect AI advice;
corrective switching after correct AI advice;
final decision accuracy;
changes in confidence;
response time;
under-reliance on correct AI advice.

These outcomes provide a broader picture of how users respond to AI recommendations beyond the primary harmful-reliance measure.

Reasoning Domains

The candidate task bank covers four domains:

1. Logical reasoning

Items examine whether participants can identify valid and invalid inferences.

2. Evidence and information evaluation

Items examine causal reasoning, sampling, generalisation, and interpretation of evidence.

3. Quantitative and risk reasoning

Items examine proportions, probabilities, base rates, and statistical interpretation.

4. Text and argument evaluation

Items examine the quality of arguments, relevance of evidence, transfer of claims, and reasoning weaknesses.

The final experiment is planned to contain three items from each domain.

Why Pre-Scripted AI Advice?

The experiment does not use a live language model during participant trials.

AI-style advice is pre-scripted so that the researcher can control:

answer correctness;
substantive reasoning;
reasoning-error type;
wording;
confidence framing;
presentation order.

Using pre-scripted advice reduces uncontrolled variation between participants and supports a cleaner experimental comparison.

Materials Development

The study uses a multi-stage materials-development process.

Stage A — Item development and qualitative audit

Candidate items were developed and reviewed for:

answer uniqueness;
ambiguity;
distractor functionality;
reasoning-mechanism overlap;
wording and stylistic cues;
answer-position balance;
consistency between AI advice and the intended reasoning error.

Stage A is complete.

Stage B — Baseline item screening

Participants complete the reasoning items without seeing AI advice.

The screening examines:

initial accuracy;
response time;
option-choice frequencies;
initial confidence;
possible ceiling or floor effects;
order and learning effects.
Stage C — Incorrect-advice plausibility screening

Incorrect AI-style explanations are separately evaluated for whether they represent plausible reasoning mistakes.

The goal is to avoid experimental items in which the incorrect advice is so implausible that participants would immediately reject it.

Stage D — Confidence-language manipulation validation

A separate manipulation pretest examines whether the high-confidence wording is perceived as more confident than calibrated-confidence wording while minimizing differences in clarity, perceived knowledge, and persuasiveness.

Final Item Selection

Following materials screening, the final experiment is planned to contain 12 experimental items.

The intended constraints are:

3 logical reasoning items;
3 evidence-evaluation items;
3 quantitative/risk items;
3 text/argument items;
6 trials with correct AI advice;
6 trials with incorrect AI advice;
balanced correct-answer positions across A, B, C, and D.

Item quality takes priority over mechanical balancing if the two ever conflict.

Planned Analysis

The main confirmatory analysis focuses on trials in which the participant's initial judgment is correct and the AI advice is incorrect.

The trial-level dependent variable is whether the participant follows the incorrect AI recommendation.

A simplified planned model is:

```text
followed_incorrect_AI ~ confidence_condition
                      + initial_confidence
                      + trial_position
                      + (1 | participant)
                      + (1 | item)
```

This mixed-effects structure allows the analysis to account for repeated observations from both participants and experimental items.

Secondary analyses will examine additional forms of reliance, resistance, switching, and final accuracy.

Current Status

The project is currently in the materials-screening phase.

Completed
research question and experimental framework;
between-subjects confidence manipulation design;
browser-based jsPsych prototype;
candidate reasoning-item bank;
Stage A qualitative materials audit;
response and data-schema design.
In Progress
Stage B baseline item screening;
Stage C incorrect-advice plausibility screening;
Stage D confidence-language manipulation validation.
Planned
final 12-item freeze;
preregistration;
main behavioral pilot;
mixed-effects analysis;
public research report and reproducibility materials.
Open Materials

Detailed experimental items, answer keys, AI-correctness assignments, and full incorrect-advice stimuli are intentionally not included in the public repository while materials screening and participant data collection are ongoing.

The repository currently functions as both:

a research-development record; and
a technical portfolio demonstrating the implementation of a controlled Human–AI Interaction experiment.

More complete reproducibility materials may be released after data collection and analysis.
