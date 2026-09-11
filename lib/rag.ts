// Backend RAG answers currently end with a hardcoded English disclaimer
// sentence from the system prompt. It's stripped here at the UI layer
// (not the model layer) and replaced with a fixed Georgian notice —
// see components/RagAnswer.tsx.
const BACKEND_DISCLAIMER_PATTERN =
  /\s*this is advisory information\s*[-‐-―]{1,2}\s*confirm with the relevant municipal authority before relying on it\.?\s*$/i;

export function stripBackendDisclaimer(answer: string): string {
  return answer.replace(BACKEND_DISCLAIMER_PATTERN, "").trimEnd();
}
