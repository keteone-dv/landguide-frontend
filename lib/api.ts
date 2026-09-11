const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export type Tier = "regular" | "pro";

export interface RagFinalAnswer {
  answer: string;
  citation: string | null;
}

export interface QueryPlotResponse {
  not_found: boolean;
  tier: string;
  regular_response: Record<string, unknown> | null;
  pro_response: Record<string, unknown> | null;
  pro_input_error: string | null;
  rag_final_answer: RagFinalAnswer | null;
}

interface QueryPlotRequestBody {
  cadastral_code: string;
  tier: Tier;
  rag_question?: string;
}

export async function queryPlot(
  code: string,
  tier: Tier,
  ragQuestion?: string
): Promise<QueryPlotResponse> {
  const body: QueryPlotRequestBody = { cadastral_code: code, tier };
  if (ragQuestion !== undefined) {
    body.rag_question = ragQuestion;
  }

  const response = await fetch(`${API_BASE_URL}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Plot query failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<QueryPlotResponse>;
}
