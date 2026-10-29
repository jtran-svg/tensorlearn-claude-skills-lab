// Rules embedded from policy.md: the grader sandbox has no imports, console or file access.
const CLINICAL_TERMS = [
  'glucose',
  'hemoglobin',
  'positive result',
  'diabetes',
  'metformin',
  'chemotherapy',
];

// A number directly followed by a clinical unit, e.g. "7.2 mmol/L" or "130 mg/dL".
const MEASUREMENT = new RegExp(
  '\\d+(?:[.,]\\d+)?\\s*(?:' +
    [
      'mmol\\s*/\\s*l',
      'mg\\s*/\\s*d?l',
      'g\\s*/\\s*d?l',
      'ng\\s*/\\s*ml',
      'u\\s*/\\s*l',
      'miu\\s*/\\s*l',
      'mmhg',
      'bpm',
      'mcg',
      'mg',
    ].join('|') +
    ')(?![a-z])',
  'i'
);

export function checkMessage(message) {
  try {
    const body = message && message.body;
    if (typeof body !== 'string' || body.trim() === '') {
      return { allowed: false, violations: ['invalid-body'] };
    }

    const text = body.replace(/\s+/g, ' ').toLowerCase();
    const violations = [];
    if (CLINICAL_TERMS.some((term) => text.includes(term))) {
      violations.push('clinical-term');
    }
    if (MEASUREMENT.test(text)) {
      violations.push('clinical-measurement');
    }
    return { allowed: violations.length === 0, violations };
  } catch {
    return { allowed: false, violations: ['invalid-body'] };
  }
}
