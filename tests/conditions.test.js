import test from "node:test";
import assert from "node:assert/strict";
import { CONDITIONS, assignCondition, buildAdvice, parseConditionOverride } from "../src/conditions.js";
import { experimentalItems } from "../src/items.js";

test("condition override parser accepts only supported values", () => {
  assert.equal(parseConditionOverride("?condition=high_confidence"), CONDITIONS.HIGH);
  assert.equal(parseConditionOverride("?condition=calibrated_confidence"), CONDITIONS.CALIBRATED);
  assert.equal(parseConditionOverride("?condition=unknown"), null);
});

test("assignment records URL override or random method", () => {
  assert.deepEqual(assignCondition("?condition=high_confidence"), { condition: CONDITIONS.HIGH, method: "url_override" });
  assert.deepEqual(assignCondition("", () => 0.9), { condition: CONDITIONS.CALIBRATED, method: "random" });
});

test("condition messages preserve AI answer and substantive reasoning", () => {
  const high = buildAdvice(experimentalItems[0], CONDITIONS.HIGH);
  const calibrated = buildAdvice(experimentalItems[0], CONDITIONS.CALIBRATED);
  assert.deepEqual(high.invariant_content, calibrated.invariant_content);
  assert.notEqual(high.confidence_language, calibrated.confidence_language);
  assert.match(high.message, new RegExp(experimentalItems[0].shared_reasoning.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(calibrated.message, new RegExp(experimentalItems[0].shared_reasoning.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});
