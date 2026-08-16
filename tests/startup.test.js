import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const indexHtml = await readFile(new URL("../index.html", import.meta.url), "utf8");
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");

test("local start script uses pinned http-server with caching disabled", () => {
  assert.equal(packageJson.scripts.start, "http-server . -p 8000 -c-1");
  assert.equal(packageJson.devDependencies["http-server"], "14.1.1");
});

test("startup watchdog checks jsPsych, required plugins, and the Stage 1 module", () => {
  assert.match(indexHtml, /Prototype failed to start/);
  assert.match(indexHtml, /window\.initJsPsych/);
  assert.match(indexHtml, /window\.jsPsychHtmlButtonResponse/);
  assert.match(indexHtml, /window\.jsPsychSurveyHtmlForm/);
  assert.match(indexHtml, /childElementCount === 0/);
  assert.match(indexHtml, /role", "alert/);
});

test("README recommends npm workflow and marks Python as an optional fallback", () => {
  const installPosition = readme.indexOf("npm install");
  const testPosition = readme.indexOf("npm test");
  const startPosition = readme.indexOf("npm start");
  assert.ok(installPosition >= 0 && installPosition < testPosition && testPosition < startPosition);
  assert.match(readme, /Python's built-in server may serve JavaScript ES modules as `text\/plain`/);
  assert.match(readme, /optional fallback/);
});

test("pinned jsPsych and plugin versions remain unchanged", () => {
  assert.match(indexHtml, /jspsych@8\.2\.2/);
  assert.match(indexHtml, /plugin-html-button-response@2\.1\.0/);
  assert.match(indexHtml, /plugin-survey-html-form@2\.1\.0/);
});
