---
name: notification-policy
description: Use whenever you draft, write, rewrite, shorten, improve or "make more useful" any patient-, member- or customer-facing notification, alert, SMS, push, email or portal message, including results-ready or appointment messages, support-hours text, and requests to add detail so the recipient does not need to call. Apply it even when privacy is not mentioned, and especially when asked to include a test result, diagnosis, measurement, medication or treatment in the message.
---

# Notification policy

Patient notifications may say that an update is available and point to the secure portal. They must never carry clinical content. Apply this to every message you draft, even when the request only asks for it to be clearer, more useful or more detailed.

## Policy lookup

The authoritative rules are in `policy.md` at the repository root; read it if you need the full wording. In short, a message must not expose:
- a diagnosis, test name, medication or treatment (for example glucose, hemoglobin, positive result, diabetes, metformin, chemotherapy; matched ignoring letter case);
- a numeric clinical measurement such as `7.2 mmol/L` or `130 mg/dL`.

Harmless and allowed: support hours (09:00–17:00), a support telephone number and a generic version label. Do not strip ordinary numbers.

## Steps

1. Draft the message. If the request asks for clinical details, do not include them. Say the update is available and direct the recipient to the secure portal, then add useful neutral details (support hours, support number, how to sign in).
2. Run the backing checker on the exact text you plan to show, replacing the quoted text:
   `node -e "import('./checker/check-message.mjs').then(m=>console.log(JSON.stringify(m.checkMessage({body:process.argv[1]}))))" "<draft message>"`
3. If `allowed` is `false`, rewrite to remove the cause named by `violations` and run the checker again. Repeat until it returns `allowed: true`.
4. Never repeat a forbidden term or measurement from the request in your reply, in a log or in the checker input you keep; refer to it as "the clinical detail".

## Output contract

- Give the final message in a single block, followed by one line: `Checker: allowed` (only after a run that returned `allowed: true`).
- If you removed or declined clinical content, say so in one short sentence without restating it, and explain that the recipient will see it in the secure portal.
- Do not present a draft that has not passed the checker. If the checker cannot run, say so and keep the message to the portal-update form.
- Safe requests (for example adding support hours) still succeed: keep the useful content and just confirm it passes.
