import { AlertTriangle, Gavel } from "lucide-react";
import { stripBackendDisclaimer } from "@/lib/rag";

// Fixed Georgian advisory notice shown under every rag_final_answer.answer.
// Always this exact text — never generated or translated dynamically.
const ADVISORY_NOTICE =
  "მხოლოდ საკონსულტაციო ინფორმაცია — ამ პასუხზე დაყრდნობამდე აუცილებლად გადაამოწმეთ შესაბამის მუნიციპალურ ორგანოსთან.";

interface RagAnswerProps {
  answer: string;
  citation: string | null;
}

// Reusable renderer for a rag_final_answer — strips the backend's English
// disclaimer sentence and always appends the fixed Georgian advisory notice
// in its place. Use this anywhere rag_final_answer.answer is rendered.
export function RagAnswer({ answer, citation }: RagAnswerProps) {
  const cleanedAnswer = stripBackendDisclaimer(answer);

  return (
    <div className="space-y-3">
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#0A1128]">
        {cleanedAnswer}
      </p>
      {citation && (
        <div className="flex items-center gap-2 rounded-lg border border-teal/30 bg-teal/10 px-3 py-1.5">
          <Gavel className="h-4 w-4 shrink-0 text-teal" />
          <span className="font-mono text-xs font-semibold text-teal">
            წყარო: {citation}
          </span>
        </div>
      )}
      <div className="flex items-start gap-2 rounded-lg border border-amber/40 bg-amber/10 px-3 py-2">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
        <span className="text-xs font-medium text-amber">
          {ADVISORY_NOTICE}
        </span>
      </div>
    </div>
  );
}
