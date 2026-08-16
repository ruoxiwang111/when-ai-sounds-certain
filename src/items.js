export const practiceItems = [
  {
    id: "dev_practice_logic_01",
    trial_type: "practice",
    category: "logic",
    question: "Developer fixture: If all tulips are flowers and this plant is a tulip, what follows?",
    options: {
      A: "The plant is a tree",
      B: "No conclusion is possible",
      C: "The plant is a flower",
      D: "All flowers are tulips"
    },
    correct_answer: "C",
    ai_answer: "C",
    ai_correct: true,
    shared_reasoning: "All members of the tulip category are stated to belong to the flower category.",
    evidence_text: "",
    approved: false,
    pretest_status: "not_tested",
    source_notes: "Constructed solely as a developer fixture from a simple categorical-logic form; no research-material validation has been performed.",
    ambiguity_notes: "Intended to be mechanically answerable for technical testing; ambiguity has not been empirically assessed.",
    notes: "Developer-only practice fixture; not validated research material."
  }
];

export const experimentalItems = [
  {
    id: "dev_experimental_logic_01",
    trial_type: "experimental",
    category: "logic",
    question: "Developer fixture: All copper objects conduct electricity. Object X is made entirely of copper. Which conclusion follows?",
    options: {
      A: "Object X cannot conduct electricity",
      B: "Object X conducts electricity only when painted",
      C: "Object X conducts electricity",
      D: "Object X is not made of metal"
    },
    correct_answer: "C",
    ai_answer: "B",
    ai_correct: false,
    shared_reasoning: "The conclusion must follow from the stated relationship between an object's material and conductivity.",
    evidence_text: "",
    approved: false,
    pretest_status: "not_tested",
    source_notes: "Constructed solely as a developer fixture from a simple conditional statement; no research-material validation has been performed.",
    ambiguity_notes: "The distractors support manual workflow testing only; ambiguity and distractor plausibility have not been empirically assessed.",
    notes: "Developer-only experimental fixture for harmful-switch testing; not validated research material."
  }
];

export const stageOneItems = [...practiceItems, ...experimentalItems];
