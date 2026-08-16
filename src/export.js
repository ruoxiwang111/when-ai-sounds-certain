export const TEST_LABELS = Object.freeze({ data_type: "test", storage_mode: "local_export" });

export function labelTestRecord(record) {
  return { ...record, ...TEST_LABELS };
}

export function sessionToJson(session) {
  return JSON.stringify({ ...session, ...TEST_LABELS }, null, 2);
}

function csvCell(value) {
  if (value === null || value === undefined) return "";
  const text = typeof value === "object" ? JSON.stringify(value) : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function trialsToCsv(trials) {
  if (!trials.length) return "";
  const labelled = trials.map(labelTestRecord);
  const headers = [...new Set(labelled.flatMap((record) => Object.keys(record)))];
  return [headers.join(","), ...labelled.map((record) => headers.map((key) => csvCell(record[key])).join(","))].join("\n");
}

export function downloadText(filename, text, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
