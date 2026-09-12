"use client";

import { Suspense, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Bot,
  Send,
  Loader2,
  AlertTriangle,
  Sparkles,
  MessageSquarePlus,
  Paperclip,
  Mic,
  MapPin,
  SlidersHorizontal,
  RotateCcw,
  Info,
} from "lucide-react";
import { queryPlot } from "@/lib/api";
import { RagAnswer } from "@/components/RagAnswer";

interface Exchange {
  id: string;
  question: string;
  answer: string;
  citation: string | null;
}

// Each chip: label IS the question, verbatim — no separate/hidden text.
// 1. Parking requirement (BAT-17) — tested 2/2 clean live tonight
//    (bounce_count 0, cited [BAT-17] both times).
// 2. K1/K2/K3 for სზ-4 (BAT-6) — strongest-performing coefficient question
//    across all of tonight's live testing rounds (2/4 clean first-try,
//    3/4 reached a correct answer overall).
// 3. Max height for სზ-2 (BAT-32) — from edge_case_results.txt (test 6):
//    real model, grounded, finalized in Georgian. Not re-verified live
//    tonight, and that run's bounce_count wasn't captured/reported.
const QUICK_PROMPTS: string[] = [
  "რამდენი ავტოსადგომის ადგილი უნდა გავითვალისწინო საცხოვრებელი ფუნქციის მქონე შენობის მშენებლობისას?",
  "რა არის K1, K2 და K3 კოეფიციენტები მაღალი ინტენსივობის საცხოვრებელი ზონისთვის (სზ-4)?",
  "რა არის მაქსიმალური სიმაღლე დაბალი ინტენსივობის საცხოვრებელი ზონისთვის (სზ-2)?",
];

function ChatPageFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="flex items-center gap-3 text-slate-500">
        <Loader2 className="h-6 w-6 animate-spin text-navy" />
        <span className="text-sm font-medium">იტვირთება...</span>
      </div>
    </div>
  );
}

function InvalidAccess() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/5 text-navy">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <div className="space-y-1.5">
        <h1 className="text-lg font-bold text-[#0A1128]">
          AI ჩატი მიუწვდომელია
        </h1>
        <p className="max-w-sm text-sm text-slate-500">
          ეს გვერდი ხელმისაწვდომია მხოლოდ საკადასტრო კოდისა და Pro პაკეტის
          მითითებით, კონკრეტული ნაკვეთის ანალიზიდან.
        </p>
      </div>
      <Link
        href="/demo"
        className="mt-2 flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow transition-all hover:bg-navy/90"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>ანალიტიკის გვერდზე დაბრუნება</span>
      </Link>
    </div>
  );
}

function ChatPageInner() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const tier = searchParams.get("tier");
  const isValid = !!code && tier === "pro";

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const nextId = useRef(0);

  if (!isValid || !code) {
    return <InvalidAccess />;
  }

  async function runQuestion(q: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await queryPlot(code as string, "pro", q);
      const rag = res.rag_final_answer;
      if (!rag) {
        setError(
          "პასუხი ვერ დაგენერირდა ამ კითხვაზე. სცადეთ სხვაგვარად ჩამოაყალიბოთ."
        );
      } else {
        nextId.current += 1;
        setExchanges((prev) => [
          ...prev,
          {
            id: String(nextId.current),
            question: q,
            answer: rag.answer,
            citation: rag.citation,
          },
        ]);
      }
    } catch {
      setError("სერვერთან დაკავშირება ვერ მოხერხდა. სცადეთ თავიდან.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = question.trim();
    if (!q || loading) return;
    setQuestion("");
    void runQuestion(q);
  }

  function handleQuickPrompt(question: string) {
    if (loading) return;
    setQuestion(question);
  }

  function handleReset() {
    setExchanges([]);
    setError(null);
    setQuestion("");
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50 text-[#0A1128] antialiased">
      {/* Header */}
      <header className="z-30 shrink-0 border-b border-white/10 bg-navy text-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt="LandGuide"
                width={40}
                height={56}
                className="h-9 w-auto sm:h-10"
              />
              <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-slate-300 sm:block">
                AI იურიდიული ასისტენტი
              </span>
            </Link>
            <div className="hidden h-6 w-px bg-white/15 md:block" />
            <Link
              href="/demo"
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors duration-150 hover:bg-white/10 hover:text-white sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">
                მთავარ ანალიტიკაზე დაბრუნება
              </span>
              <span className="sm:hidden">დაბრუნება</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300 lg:flex">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span>EPSG:32638 • WGS 84</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
              </span>
              <span className="hidden text-xs font-medium text-teal sm:inline">
                AI ასისტენტი • ონლაინ
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white lg:flex xl:w-80">
          <div className="border-b border-slate-200 p-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-navy/90 active:scale-[0.99]"
            >
              <MessageSquarePlus className="h-[18px] w-[18px]" />
              <span>ახალი ჩატი</span>
            </button>
          </div>

          <div className="border-b border-slate-200 bg-slate-50/60 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                არჩეული ნაკვეთი
              </span>
              <span className="rounded-md border border-teal/30 bg-teal/10 px-2 py-0.5 text-[11px] font-semibold text-teal">
                აქტიური
              </span>
            </div>
            <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between font-mono text-sm font-semibold tracking-wide text-[#0A1128]">
                <span>{code}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                <span className="flex items-center gap-1 rounded-md border border-navy/20 bg-navy/5 px-2 py-0.5 text-[11px] font-semibold text-navy">
                  <Sparkles className="h-3 w-3" />
                  PRO ანალიზი
                </span>
                <Link
                  href="/demo"
                  className="text-xs font-medium text-navy hover:text-navy/70"
                >
                  დეტალები →
                </Link>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4">
            <span className="mb-2.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              მიმდინარე სესია
            </span>
            <div className="flex items-center gap-2.5 rounded-xl border border-navy/20 bg-navy/5 p-2.5">
              <Bot className="h-[18px] w-[18px] shrink-0 text-navy" />
              <div className="flex-1 truncate text-left">
                <span className="block truncate text-xs font-semibold text-navy">
                  აქტიური საუბარი
                </span>
                <span className="block truncate text-[11px] text-slate-500">
                  {exchanges.length === 0
                    ? "შეკითხვები ჯერ არ დასმულა"
                    : `${exchanges.length} შეკითხვა-პასუხი`}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 p-4">
            <span className="mb-2.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              ხშირად დასმული საკითხები
            </span>
            <div className="flex flex-col gap-1.5">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-left text-xs font-medium text-slate-600 transition-all hover:border-navy/40 hover:text-navy"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main chat column */}
        <main className="flex flex-1 flex-col overflow-hidden bg-slate-50">
          {/* Sticky context bar */}
          <section className="z-20 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur-md sm:px-6">
            <div className="flex items-center gap-2 overflow-x-auto">
              <div className="flex items-center gap-2 rounded-lg border border-navy/20 bg-navy/5 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-navy" />
                <span className="text-xs font-semibold text-navy">
                  ნაკვეთი:
                </span>
                <span className="font-mono text-xs font-bold text-navy">
                  {code}
                </span>
              </div>
              <span className="hidden items-center rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs text-slate-600 sm:inline-flex">
                პაკეტი: <strong className="ml-1 text-[#0A1128]">Pro</strong>
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/demo"
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold text-navy transition-colors hover:bg-navy/5"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">ნაკვეთის შეცვლა</span>
              </Link>
              <div className="hidden h-4 w-px bg-slate-200 sm:block" />
              <button
                type="button"
                onClick={handleReset}
                title="საუბრის გასუფთავება"
                className="rounded p-1 text-slate-400 transition-colors hover:text-slate-700"
              >
                <RotateCcw className="h-[18px] w-[18px]" />
              </button>
            </div>
          </section>

          {/* Message stream */}
          <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10">
            {/* Static welcome message */}
            <div className="flex max-w-3xl items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-navy to-[#1e3a8a] text-white shadow-sm">
                <Bot className="h-[22px] w-[22px]" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-sm font-bold text-navy">
                      LandGuide AI ასისტენტი
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#0A1128]">
                    გამარჯობა! მე ვარ{" "}
                    <strong className="font-semibold text-navy">
                      LandGuide-ის იურიდიული და ქალაქგეგმარებითი AI
                      კონსულტანტი
                    </strong>
                    . გააქტიურებულია ნაკვეთი კოდით{" "}
                    <span className="rounded border border-navy/20 bg-navy/5 px-1.5 py-0.5 font-mono text-xs font-bold text-navy">
                      {code}
                    </span>{" "}
                    (Pro პაკეტი). დამისვით კითხვა სამშენებლო რეგლამენტის,
                    K1/K2/K3 კოეფიციენტების ან სამშენებლო შეზღუდვების შესახებ.
                  </p>
                </div>
              </div>
            </div>

            {/* Conversation */}
            {exchanges.map((ex) => (
              <div key={ex.id} className="space-y-6">
                {/* User bubble */}
                <div className="ml-auto flex max-w-2xl items-start justify-end gap-3">
                  <div className="rounded-2xl rounded-tr-sm bg-navy p-4 text-white shadow-sm">
                    <p className="text-sm leading-relaxed">{ex.question}</p>
                  </div>
                </div>

                {/* AI answer bubble */}
                <div className="flex max-w-3xl items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-coral/30 bg-gradient-to-br from-navy to-[#1e3a8a] text-white shadow-sm">
                    <Bot className="h-[22px] w-[22px]" />
                  </div>
                  <div className="flex-1 space-y-3 rounded-2xl border border-teal/25 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                      <span className="flex items-center gap-1.5 rounded-md border border-teal/30 bg-teal/10 px-2.5 py-1 text-xs font-bold text-teal">
                        <Sparkles className="h-3.5 w-3.5" />
                        AI-გენერირებული პასუხი
                      </span>
                    </div>
                    <RagAnswer answer={ex.answer} citation={ex.citation} />
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex max-w-3xl items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-coral/30 bg-gradient-to-br from-navy to-[#1e3a8a] text-white shadow-sm">
                  <Bot className="h-[22px] w-[22px]" />
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Loader2 className="h-5 w-5 animate-spin text-navy" />
                  <span className="text-sm font-medium text-slate-500">
                    პასუხის მომზადება... შესაძლოა რამდენიმე წამი დასჭირდეს
                  </span>
                </div>
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div className="flex max-w-3xl items-center gap-3 rounded-2xl border border-slate-300 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm">
                <AlertTriangle className="h-5 w-5 shrink-0 text-slate-500" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Input footer */}
          <footer className="z-20 shrink-0 border-t border-slate-200 bg-white p-4 shadow-lg sm:p-6">
            <div className="mx-auto max-w-3xl space-y-2">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-1 rounded-2xl border border-slate-300 bg-slate-50 p-1.5 shadow-inner transition-all focus-within:border-navy focus-within:ring-3 focus-within:ring-navy/15"
              >
                <button
                  type="button"
                  disabled
                  title="მალე ხელმისაწვდომი იქნება"
                  className="hidden rounded-xl p-2 text-slate-400 transition-all hover:bg-white hover:text-navy disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400 sm:block"
                >
                  <Paperclip className="h-[22px] w-[22px]" />
                </button>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={loading}
                  placeholder="ჰკითხე AI ასისტენტს ამ ნაკვეთის შესახებ..."
                  className="flex-1 border-0 bg-transparent px-3 py-2 text-sm text-[#0A1128] outline-none placeholder:text-slate-400 disabled:opacity-60"
                />
                <button
                  type="button"
                  disabled
                  title="მალე ხელმისაწვდომი იქნება"
                  className="hidden rounded-xl p-2 text-slate-400 transition-all hover:bg-white hover:text-navy disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400 md:block"
                >
                  <Mic className="h-[22px] w-[22px]" />
                </button>
                <button
                  type="submit"
                  disabled={!question.trim() || loading}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-[18px] w-[18px] animate-spin" />
                  ) : (
                    <>
                      <span className="hidden sm:inline">გაგზავნა</span>
                      <Send className="h-[18px] w-[18px]" />
                    </>
                  )}
                </button>
              </form>
              <div className="flex items-center gap-1.5 px-2 text-[11px] text-slate-400">
                <Info className="h-3.5 w-3.5 shrink-0" />
                <span>
                  პასუხები გენერირდება ხელოვნური ინტელექტის მიერ საქართველოს
                  კანონმდებლობისა და მუნიციპალური გენგეგმის საფუძველზე.
                </span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatPageFallback />}>
      <ChatPageInner />
    </Suspense>
  );
}
