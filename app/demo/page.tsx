"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
  Landmark,
  User,
  Zap,
  ChevronRight,
  MapPin,
  Search,
  Square,
  BadgeCheck,
  CheckCircle2,
  Map as MapIcon,
  FileText,
  Share2,
  Ruler,
  Mountain,
  Gavel,
  Info,
  Sparkles,
  ArrowUpDown,
  LayoutGrid,
  Shield,
  Compass,
  ArrowRight,
  HelpCircle,
  Building,
  ParkingCircle,
  Bot,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { queryPlot, type QueryPlotResponse, type Tier } from "@/lib/api";

// lib/api.ts intentionally types regular_response / pro_response as
// Record<string, unknown> (a generic backend contract). The shapes below
// mirror the real fields returned by desks/regular.py and desks/pro.py so
// this page can render them without unknown-casts scattered everywhere.
interface BaseFields {
  owner_name: string;
  address: string;
  total_area_sqm: number;
  land_designation: string;
  legal_status: string;
  legal_status_note: string;
}

interface ProFields extends BaseFields {
  functional_zone: string;
  k1_footprint_sqm: number;
  k2_buildable_floor_area_sqm: number;
  k3_green_space_sqm: number;
  max_height_m: number;
  density_limit_units_per_ha: number;
  buffer_zones: string[];
}

const LEGAL_STATUS_LABEL: Record<string, string> = {
  clean: "იურიდიულად სუფთა",
  active_mortgage: "იპოთეკით დატვირთული",
  seizure: "დაყადაღებული",
  restricted: "შეზღუდული",
};

// Reserved strictly for this badge — amber/danger aren't reused elsewhere on the page.
const LEGAL_STATUS_COLOR: Record<string, string> = {
  clean: "text-teal",
  active_mortgage: "text-amber",
  restricted: "text-orange",
  seizure: "text-danger",
};

const LAND_DESIGNATION_LABEL: Record<string, string> = {
  agricultural: "სასოფლო-სამეურნეო",
  "non-agricultural": "არასასოფლო-სამეურნეო",
};

function formatNumber(n: number): string {
  return n.toLocaleString("ka-GE");
}

export default function Demo() {
  const [code, setCode] = useState("");
  const [tier, setTier] = useState<Tier>("regular");
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [result, setResult] = useState<QueryPlotResponse | null>(null);
  const [queriedCode, setQueriedCode] = useState("");

  async function runQuery(digits: string, t: Tier) {
    setLoading(true);
    setNetworkError(null);
    try {
      const res = await queryPlot(digits, t);
      setResult(res);
      setQueriedCode(digits);
    } catch {
      setNetworkError("სერვერთან დაკავშირება ვერ მოხერხდა. სცადეთ თავიდან.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  function handleCodeChange(e: ChangeEvent<HTMLInputElement>) {
    setCode(e.target.value.replace(/\D/g, "").slice(0, 10));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (code.length !== 10 || loading) return;
    void runQuery(code, tier);
  }

  function handleTierChange(t: Tier) {
    setTier(t);
    // If a result is already on screen, re-run immediately so the tab feels
    // like a live toggle instead of only affecting the next manual search.
    if (result && !result.not_found && queriedCode) {
      void runQuery(queriedCode, t);
    }
  }

  const isPro = result?.tier === "pro";
  const base = (result?.regular_response ?? result?.pro_response) as
    | BaseFields
    | undefined;
  const pro = isPro
    ? (result?.pro_response as unknown as ProFields | undefined)
    : undefined;

  const showIdle = !loading && !result && !networkError;
  const showNotFound = !loading && !!result?.not_found;
  const showProInputError = !loading && isPro && !!result?.pro_input_error;
  const showResult = !loading && !!result && !result.not_found && !!base;

  return (
    <div className="flex min-h-full flex-col bg-slate-50 text-[#0A1128] antialiased selection:bg-navy selection:text-white">
      {/* Header & Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-navy text-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-12">
          <div className="flex items-center gap-4 sm:gap-10">
            <Link className="group flex items-center gap-3" href="/">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white shadow-md transition-transform duration-200 group-hover:scale-105 sm:h-10 sm:w-10">
                <Landmark className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white sm:text-xl">
                LandGuide
              </span>
            </Link>
            <nav className="hidden items-center gap-7 md:flex">
              <a
                className="border-b-2 border-white pb-1 text-sm font-medium text-white"
                href="#"
              >
                შესაძლებლობები
              </a>
              <a
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                href="#"
              >
                პაკეტები
              </a>
              <a
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                href="#"
              >
                ჩვენს შესახებ
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              disabled
              title="მალე ხელმისაწვდომი იქნება"
              className="hidden items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-300 disabled:cursor-not-allowed sm:flex"
            >
              <User className="h-4 w-4" />
              <span>შესვლა</span>
            </button>
            <button
              type="button"
              disabled
              title="მალე ხელმისაწვდომი იქნება"
              className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-navy shadow transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-90 sm:px-5"
            >
              <Zap className="h-4 w-4" />
              <span>სცადე უფასოდ</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-12">
        {/* Search & Tier Selector Section */}
        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <nav
                aria-label="Breadcrumb"
                className="mb-1.5 flex items-center gap-2 text-xs font-medium text-slate-500"
              >
                <Link className="transition-colors hover:text-navy" href="/">
                  მთავარი
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                <span className="font-semibold text-slate-800">
                  საკადასტრო ანალიტიკა
                </span>
              </nav>
              <h1 className="text-2xl font-bold tracking-tight text-[#0A1128] lg:text-3xl">
                საკადასტრო და დეტალური ანალიზი
              </h1>
              <p className="mt-0.5 text-sm text-slate-500">
                შეიყვანეთ ნაკვეთის კოდი და აირჩიეთ ანალიზის დონე
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-teal" />
                <span>ბაზა აქტიურია</span>
              </div>
              <div className="rounded-xl border border-navy/10 bg-navy/5 px-3 py-1.5 font-mono text-xs font-semibold text-navy">
                EPSG:32638 • WGS 84
              </div>
            </div>
          </div>

          {/* Search Bar Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_-2px_rgba(10,17,40,0.05)] lg:p-5">
            <form
              className="flex flex-col items-center gap-3 md:flex-row"
              onSubmit={handleSubmit}
            >
              <div className="relative w-full flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <input
                  id="cadastralSearchInput"
                  type="text"
                  inputMode="numeric"
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="შეიყვანეთ 10-ნიშნა საკადასტრო კოდი... მაგ. 0100112233"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-4 font-mono text-base font-medium text-[#0A1128] placeholder:text-slate-400 transition-all hover:bg-slate-50 focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>
              <button
                type="submit"
                disabled={code.length !== 10 || loading}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-navy px-7 py-3.5 font-semibold text-white shadow transition-all duration-150 hover:bg-navy/90 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                <span>ძებნა და ანალიზი</span>
              </button>
            </form>

            {/* Plan Tier Selector */}
            <div className="mt-4 flex flex-col justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  ანალიზის დონე:
                </span>
                <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => handleTierChange("regular")}
                    className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                      tier === "regular"
                        ? "bg-navy text-white shadow-[0_4px_12px_rgba(30,39,97,0.25)]"
                        : "text-slate-500 hover:bg-slate-200/60 hover:text-[#0A1128]"
                    }`}
                  >
                    <Square className="h-4 w-4" />
                    <span>სტანდარტული გეგმა</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTierChange("pro")}
                    className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                      tier === "pro"
                        ? "bg-navy text-white shadow-[0_4px_12px_rgba(30,39,97,0.25)]"
                        : "text-slate-500 hover:bg-slate-200/60 hover:text-[#0A1128]"
                    }`}
                  >
                    <BadgeCheck className="h-4 w-4" />
                    <span>პრო პაკეტი</span>
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-extrabold ${
                        tier === "pro"
                          ? "bg-white/20 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      PRO
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 rounded-lg border border-teal/30 bg-teal/10 px-2.5 py-1 font-medium text-teal">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  საკადასტრო მონაცემი გადამოწმებულია
                </span>
              </div>
            </div>
          </div>
        </section>

        {networkError && (
          <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm">
            <AlertTriangle className="h-5 w-5 shrink-0 text-slate-500" />
            <span>{networkError}</span>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-16 shadow-sm">
            <div className="flex items-center gap-3 text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin text-navy" />
              <span className="text-sm font-medium">
                მონაცემები იტვირთება...
              </span>
            </div>
          </div>
        )}

        {showIdle && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-sm">
            <MapIcon className="h-10 w-10 text-slate-300" />
            <p className="mt-3 text-sm font-medium text-slate-500">
              შეიყვანეთ 10-ნიშნა საკადასტრო კოდი ანალიზის დასაწყებად
            </p>
          </div>
        )}

        {showNotFound && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
            <AlertTriangle className="h-10 w-10 text-slate-400" />
            <p className="text-base font-bold text-[#0A1128]">
              ნაკვეთი ვერ მოიძებნა
            </p>
            <p className="max-w-md text-sm text-slate-500">
              კოდი „{queriedCode}“ არ არის რეესტრში ან არასწორად არის
              შეყვანილი. გადაამოწმეთ 10-ნიშნა საკადასტრო კოდი და სცადეთ
              თავიდან.
            </p>
          </div>
        )}

        {showProInputError && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <AlertTriangle className="h-10 w-10 text-slate-400" />
            <p className="text-base font-bold text-[#0A1128]">
              პრო ანალიზი დროებით მიუწვდომელია ამ ნაკვეთისთვის
            </p>
            <p className="max-w-lg text-sm text-slate-500">
              ნაკვეთის ზონირების მონაცემები ვერ გადის სისტემურ ვალიდაციას,
              ამიტომ K1/K2/K3 მაჩვენებლების გამოთვლა ვერ ხერხდება.
            </p>
            <p className="mt-1 rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-xs text-slate-500">
              {result?.pro_input_error}
            </p>
            <button
              type="button"
              onClick={() => handleTierChange("regular")}
              className="mt-3 rounded-xl bg-navy px-5 py-2.5 text-xs font-semibold text-white shadow transition-all hover:bg-navy/90"
            >
              სტანდარტული მონაცემების ნახვა
            </button>
          </div>
        )}

        {showResult && base && (
          <>
            {/* Property Header Info Badge */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_-2px_rgba(10,17,40,0.05)] md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy">
                  <MapIcon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="font-mono text-lg font-bold text-[#0A1128]">
                      {queriedCode}
                    </h2>
                    <span className="flex items-center gap-1 rounded-full border border-teal/30 bg-teal/10 px-2.5 py-0.5 text-xs font-semibold text-teal">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                      მოიძებნა რეესტრში
                    </span>
                    <span className="flex items-center gap-1 rounded-full border border-navy/20 bg-navy/5 px-2.5 py-0.5 text-xs font-semibold text-navy">
                      {isPro ? (
                        <Sparkles className="h-3.5 w-3.5" />
                      ) : (
                        <FileText className="h-3.5 w-3.5" />
                      )}
                      {isPro ? "სრული პრო ანალიტიკა" : "სტანდარტული ანალიტიკა"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{base.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled
                  title="მალე ხელმისაწვდომი იქნება — იხ. პროდუქტის საგზაო რუკა"
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FileText className="h-4 w-4" />
                  <span>PDF ექსპორტი</span>
                </button>
                <button
                  type="button"
                  disabled
                  title="მალე ხელმისაწვდომი იქნება"
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Share2 className="h-4 w-4" />
                  <span>გაზიარება</span>
                </button>
              </div>
            </div>

            {/* Standard Fields */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-navy" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                    სტანდარტული საკადასტრო მონაცემები
                  </h3>
                </div>
                <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                  რეესტრის ძირითადი ბაზა
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <FieldCard
                  eyebrow="საკუთრების უფლება"
                  title="მესაკუთრე"
                  icon={<User className="h-[18px] w-[18px]" />}
                >
                  <p className="text-base font-bold text-[#0A1128]">
                    {base.owner_name}
                  </p>
                </FieldCard>

                <FieldCard
                  eyebrow="ლოკაცია"
                  title="მისამართი"
                  icon={<MapPin className="h-[18px] w-[18px]" />}
                >
                  <p className="text-base font-bold text-[#0A1128]">
                    {base.address}
                  </p>
                </FieldCard>

                <FieldCard
                  eyebrow="მიწის სიდიდე"
                  title="საერთო ფართობი"
                  icon={<Ruler className="h-[18px] w-[18px]" />}
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold tracking-tight text-[#0A1128]">
                      {formatNumber(base.total_area_sqm)}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">
                      მ²
                    </span>
                    <span className="ml-auto rounded border border-teal/30 bg-teal/10 px-2 py-0.5 text-[11px] font-semibold text-teal">
                      დაზუსტებული
                    </span>
                  </div>
                </FieldCard>

                <FieldCard
                  eyebrow="კატეგორია"
                  title="მიწის დანიშნულება"
                  icon={<Mountain className="h-[18px] w-[18px]" />}
                >
                  <p className="text-base font-bold text-[#0A1128]">
                    {LAND_DESIGNATION_LABEL[base.land_designation] ??
                      base.land_designation}
                  </p>
                </FieldCard>

                <FieldCard
                  eyebrow="სამართლებრივი რეჟიმი"
                  title="სამართლებრივი სტატუსი"
                  icon={<Gavel className="h-[18px] w-[18px]" />}
                >
                  <p
                    className={`flex items-center gap-1 text-base font-bold ${
                      LEGAL_STATUS_COLOR[base.legal_status] ?? "text-slate-700"
                    }`}
                  >
                    {base.legal_status === "clean" ? (
                      <BadgeCheck className="h-[18px] w-[18px]" />
                    ) : (
                      <AlertTriangle className="h-[18px] w-[18px]" />
                    )}
                    {LEGAL_STATUS_LABEL[base.legal_status] ??
                      base.legal_status}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {base.legal_status_note}
                  </p>
                </FieldCard>

                <FieldCard
                  eyebrow="რეესტრის ჩანაწერი"
                  title="შენიშვნა"
                  icon={<Info className="h-[18px] w-[18px]" />}
                >
                  <p className="text-xs font-medium leading-relaxed text-slate-700">
                    {base.legal_status_note}
                  </p>
                </FieldCard>
              </div>
            </section>

            {/* Pro Metrics */}
            {isPro && pro && (
              <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 animate-ping rounded-full bg-navy" />
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy">
                      <span>გაფართოებული პრო ანალიტიკა</span>
                      <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                        აქტიური
                      </span>
                    </h3>
                  </div>
                  <span className="rounded-md border border-navy/20 bg-navy/5 px-2.5 py-0.5 font-mono text-xs font-medium text-navy">
                    ზონა: {pro.functional_zone}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* K1 */}
                  <ProCard
                    eyebrow="განაშენიანების კოეფიციენტი"
                    title={`K-1`}
                    badge="K1"
                  >
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-[#0A1128]">
                        {formatNumber(pro.k1_footprint_sqm)}
                      </span>
                      <span className="text-sm font-semibold text-slate-500">
                        მ²
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">
                      მაქს. განაშენიანების ფართობი (ანაბეჭდი მიწაზე)
                    </p>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-navy"
                        style={{
                          width: `${Math.min(
                            100,
                            (pro.k1_footprint_sqm / pro.total_area_sqm) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </ProCard>

                  {/* K2 — no bar: FAR-derived floor area can exceed the lot's
                      own footprint, so a 0-100% bar would misrepresent it. */}
                  <ProCard
                    eyebrow="ინტენსივობის კოეფიციენტი"
                    title="K-2"
                    badge="K2"
                  >
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-navy">
                        {formatNumber(pro.k2_buildable_floor_area_sqm)}
                      </span>
                      <span className="text-sm font-semibold text-slate-500">
                        მ²
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">
                      სამშენებლო მოცულობის საერთო ჯამი
                    </p>
                  </ProCard>

                  {/* K3 */}
                  <ProCard
                    eyebrow="გამწვანების კოეფიციენტი"
                    title="K-3"
                    badge="K3"
                    badgeTone="teal"
                  >
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-teal">
                        {formatNumber(pro.k3_green_space_sqm)}
                      </span>
                      <span className="text-sm font-semibold text-slate-500">
                        მ²
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">
                      მინიმალური სავალდებულო გამწვანებული ფართობი
                    </p>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-teal"
                        style={{
                          width: `${Math.min(
                            100,
                            (pro.k3_green_space_sqm / pro.total_area_sqm) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </ProCard>

                  <FieldCard
                    eyebrow="სართულიანობის ზღვარი"
                    title="მაქსიმალური სიმაღლე"
                    icon={<ArrowUpDown className="h-[18px] w-[18px]" />}
                    proStyle
                  >
                    <span className="text-2xl font-bold text-[#0A1128]">
                      {formatNumber(pro.max_height_m)} მ
                    </span>
                  </FieldCard>

                  <FieldCard
                    eyebrow="ზონირების ინტენსივობა"
                    title="სიმჭიდროვის ლიმიტი"
                    icon={<LayoutGrid className="h-[18px] w-[18px]" />}
                    proStyle
                  >
                    <span className="text-2xl font-bold text-[#0A1128]">
                      {formatNumber(pro.density_limit_units_per_ha)}
                    </span>
                    <span className="ml-1 text-sm font-semibold text-slate-500">
                      ერთეული/ჰა
                    </span>
                  </FieldCard>

                  <FieldCard
                    eyebrow="დამცავი ზოლები"
                    title="ბუფერული ზონები"
                    icon={<Shield className="h-[18px] w-[18px]" />}
                    proStyle
                  >
                    {pro.buffer_zones.length === 0 ? (
                      <p className="text-sm font-bold text-[#0A1128]">
                        ბუფერული ზონა არ ფიქსირდება
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {pro.buffer_zones.map((zone) => (
                          <span
                            key={zone}
                            className="rounded-md border border-navy/15 bg-navy/5 px-2 py-0.5 font-mono text-[11px] font-semibold text-navy"
                          >
                            {zone}
                          </span>
                        ))}
                      </div>
                    )}
                  </FieldCard>
                </div>
              </section>
            )}

            {/* Standard-tier upsell */}
            {!isPro && (
              <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-navy/15 bg-navy/5 p-6 shadow-[0_4px_20px_-2px_rgba(10,17,40,0.05)] sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white shadow-md">
                    <Compass className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0A1128]">
                      გსურთ სამშენებლო კოეფიციენტების სრული გაანგარიშება?
                    </h4>
                    <p className="mt-1 max-w-2xl text-xs text-slate-600">
                      გადართეთ <strong>პრო პაკეტზე</strong> და მყისიერად
                      იხილეთ K-1, K-2, K-3 მაჩვენებლები, მაქსიმალური სიმაღლე,
                      განაშენიანების სიმჭიდროვე და ბუფერული ზონები.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTierChange("pro")}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-navy px-5 py-3 text-xs font-semibold text-white shadow transition-all hover:bg-navy/90"
                >
                  <span>პრო ანალიზის ჩვენება</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* AI Chat CTA — Pro tier only */}
            {isPro && (
              <section>
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy p-6 text-white shadow-[0_10px_30px_-4px_rgba(10,17,40,0.08)] lg:p-8">
                  <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-coral/20 blur-3xl" />
                  <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
                    <div className="max-w-2xl space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-coral backdrop-blur-md">
                        <Sparkles className="h-4 w-4" />
                        <span>LandGuide AI Regulatory Advisor</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-white lg:text-2xl">
                          AI ასისტენტთან გადასვლა
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-300">
                          გაქვთ კითხვები სამშენებლო ნორმებზე ან ბათუმის
                          საკრებულოს დადგენილებებზე? გაიარეთ დეტალური
                          კონსულტაცია AI იურიდიულ ასისტენტთან კონკრეტულად ამ
                          ნაკვეთის პარამეტრებზე.
                        </p>
                      </div>
                      <div className="pt-2">
                        <span className="mb-2 block text-xs font-medium text-slate-400">
                          ხშირად დასმული კითხვები ნაკვეთზე:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/demo/chat?code=${queriedCode}&tier=pro`}
                            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs text-slate-200 transition-colors hover:bg-white/20"
                          >
                            <HelpCircle className="h-3.5 w-3.5" />
                            <span>რა მანძილი უნდა იყოს მიჯნიდან?</span>
                          </Link>
                          <Link
                            href={`/demo/chat?code=${queriedCode}&tier=pro`}
                            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs text-slate-200 transition-colors hover:bg-white/20"
                          >
                            <Building className="h-3.5 w-3.5" />
                            <span>შემიძლია 5 სართულის აშენება?</span>
                          </Link>
                          <Link
                            href={`/demo/chat?code=${queriedCode}&tier=pro`}
                            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs text-slate-200 transition-colors hover:bg-white/20"
                          >
                            <ParkingCircle className="h-3.5 w-3.5" />
                            <span>რამდენი პარკინგია სავალდებულო?</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-stretch justify-center gap-3 sm:flex-row lg:flex-col lg:items-end">
                      <Link
                        href={`/demo/chat?code=${queriedCode}&tier=pro`}
                        className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-coral px-7 py-4 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral/90 hover:shadow-xl active:scale-95"
                      >
                        <Bot className="h-5 w-5" />
                        <span>კითხვა რეგულაციებზე</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <span className="text-center text-[11px] text-slate-400 lg:text-right">
                        პასუხები ეფუძნება კანონმდებლობას და უახლეს ამონაწერს
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 bg-navy text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 text-xs sm:px-6 md:flex-row lg:px-12">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white">
                <Landmark className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold text-white">LandGuide</span>
            </div>
            <p className="text-slate-400">
              © 2026 LandGuide. ყველა უფლება დაცულია. საკადასტრო და
              ზონირების ანალიტიკური პლატფორმა.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a className="transition-colors hover:text-white" href="#">
              კონფიდენციალურობის პოლიტიკა
            </a>
            <a className="transition-colors hover:text-white" href="#">
              მომსახურების პირობები
            </a>
            <a className="transition-colors hover:text-white" href="#">
              საკადასტრო მონაცემთა რეგლამენტი
            </a>
            <a className="transition-colors hover:text-white" href="#">
              კონტაქტი
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FieldCard({
  eyebrow,
  title,
  icon,
  children,
  proStyle = false,
}: {
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  proStyle?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-[0_4px_20px_-2px_rgba(10,17,40,0.05)] transition-all hover:border-slate-300 ${
        proStyle ? "border-2 border-navy/15" : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="mb-1 block text-xs font-medium text-slate-500">
            {eyebrow}
          </span>
          <h4 className="text-sm font-bold text-[#0A1128]">{title}</h4>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/5 text-navy">
          {icon}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ProCard({
  eyebrow,
  title,
  badge,
  badgeTone = "navy",
  children,
}: {
  eyebrow: string;
  title: string;
  badge: string;
  badgeTone?: "navy" | "teal";
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-navy/15 bg-white p-5 shadow-[0_4px_20px_-2px_rgba(10,17,40,0.05)] transition-all hover:border-navy/40">
      <div className="flex items-start justify-between">
        <div>
          <span className="mb-1 block text-xs font-semibold text-navy">
            {eyebrow}
          </span>
          <h4 className="font-mono text-base font-bold text-[#0A1128]">
            {title}
          </h4>
        </div>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
            badgeTone === "teal"
              ? "bg-teal/10 text-teal"
              : "bg-navy/5 text-navy"
          }`}
        >
          {badge}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
