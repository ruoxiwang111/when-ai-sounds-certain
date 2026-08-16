# When AI Sounds Certain

A browser-based Human-AI Interaction research prototype investigating whether confident wording increases reliance on incorrect predefined AI advice.

## Current scope

This repository currently implements the **Stage 1 technical slice** only:

- one developer-test practice fixture;
- one developer-test experimental fixture;
- predefined deterministic AI advice;
- browser-local test data;
- JSON session export and trial-level CSV export.

It is not approved for real participant recruitment. The fixtures are unvalidated, the consent and debrief are drafts, and no direct personal information should be entered.

## Technology

- jsPsych `8.2.2` (pinned CDN build)
- jsPsych HTML Button Response plugin `2.1.0`
- jsPsych Survey HTML Form plugin `2.1.0`
- Plain JavaScript ES modules, HTML, and CSS
- Node's built-in test runner

No React, backend, remote storage, live LLM API, analytics, or authentication is used.

## Run locally

From the repository root:

```powershell
npm install
npm test
npm start
```

Open `http://localhost:8000/`.

The recommended server is the pinned development dependency `http-server`, started with cache disabled. Python's built-in server may serve JavaScript ES modules as `text/plain` on some Windows systems, causing the browser to reject `src/experiment.js`. It should therefore be used only as an optional fallback:

```powershell
python -m http.server 8000
```

If the browser reports an ES-module MIME-type error with the Python fallback, stop it and use `npm start`.

Force a test condition with:

- `http://localhost:8000/?condition=high_confidence`
- `http://localhost:8000/?condition=calibrated_confidence`

Without an override, one condition is randomly assigned once for the new page session. Refreshing creates a new test session; session recovery is intentionally not implemented.

In the current Stage 1 export, `completed = true` means that the participant reached the final download screen. It does not confirm that either export button was used, and it is not a session-recovery or research-completion guarantee.

The trial field `post_advice_decision_time_ms` measures the elapsed interval from the display of AI advice until submission of the final answer. It includes post-advice reading and decision time and must not be interpreted as pure advice-viewing time. `item_record_index` is the zero-based order of saved item records; it is not a jsPsych timeline index.

## Manual metric checks

- **Harmful switch:** on the experimental fixture choose `C` initially, then follow the incorrect AI answer `B`.
- **Reject incorrect advice:** on the experimental fixture choose `C` initially and keep `C` finally.
- **Beneficial switch:** on the practice fixture choose any incorrect answer initially, then switch to the AI's correct answer `C`.

All exported records are labelled `data_type = "test"` and `storage_mode = "local_export"`.

## Manipulation-language pretest

The separate developer-only pretest presents one predefined AI response and collects four 1–7 appearance ratings. It reuses the Stage 1 condition-rendering logic, stores no data remotely, and labels exports with `data_type = "test"`, `storage_mode = "local_export"`, and `study_phase = "manipulation_pretest"`. Its material is a developer fixture, not validated research material.

After running `npm install`, `npm test`, and `npm start`, open:

- `http://localhost:8000/pretest.html` for random assignment;
- `http://localhost:8000/pretest.html?condition=high_confidence` to force high-confidence wording;
- `http://localhost:8000/pretest.html?condition=calibrated_confidence` to force calibrated-confidence wording.

Both forced conditions must show the same prompt context, substantive reasoning, answer, layout, and styling. Only the confidence wording changes.

## Manipulation-pretest analysis

Install the pinned analysis dependency once:

```powershell
python -m pip install -r analysis/requirements.txt
```

Place pretest CSV exports in `analysis/pretest_data/`, then run:

```powershell
python analysis/pretest_analysis.py
```

The script reads all CSV files in that directory, validates their columns, excludes files not labelled exclusively as `study_phase = manipulation_pretest`, and reports group sizes, means, SDs, high-minus-calibrated differences, 95% confidence intervals, Cohen's d, and a Welch independent-samples comparison for perceived AI confidence.

The included `simulated_example.csv` exists only to test the workflow and is labelled `data_type = simulated`. Remove or move it before analyzing participant exports. The printed manipulation and confound thresholds are provisional development criteria, not universal scientific standards. Interpret descriptive patterns, effect sizes, uncertainty intervals, material quality, and p-values together; a small-sample p-value should never be the sole decision criterion.
