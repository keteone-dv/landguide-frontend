import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  User,
  ArrowRight,
  BadgeCheck,
  Layers,
  Gavel,
  MapPin,
  Search,
  Clock,
  Hash,
  Ruler,
  Building,
  Calculator,
  CheckCircle2,
  XCircle,
  Network,
  Compass,
  Bot,
  MessageCircle,
  Database,
  Brain,
  FileText,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white text-[#0A1128] antialiased selection:bg-navy selection:text-white">
      {/* ================= HERO + NAVBAR ================= */}
      <header className="relative overflow-hidden bg-navy pb-32 pt-0 text-white sm:pb-40">
        {/* Cadastral grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"
        />
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-teal/10 blur-[130px]"
        />

        <div className="relative z-20 border-b border-white/10">
          <nav
            aria-label="მთავარი ნავიგაცია"
            className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-12"
          >
            <Link className="group flex items-center" href="/">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 p-2 shadow-md transition-transform duration-200 group-hover:scale-105 sm:h-11 sm:w-11">
                <Image
                  src="/logo.png"
                  alt="LandGuide"
                  width={318}
                  height={299}
                  className="h-full w-full object-contain"
                />
              </div>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <a
                className="border-b-2 border-white pb-1 text-sm font-semibold text-white"
                href="#features"
              >
                შესაძლებლობები
              </a>
              <a
                className="text-sm font-medium text-slate-300 transition-colors duration-150 hover:text-white"
                href="#pricing"
              >
                პაკეტები
              </a>
              <a
                className="text-sm font-medium text-slate-300 transition-colors duration-150 hover:text-white"
                href="#"
              >
                ჩვენს შესახებ
              </a>
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
              <Link
                href="/demo"
                className="flex items-center gap-2 rounded-lg bg-white px-3.5 py-2.5 text-sm font-semibold text-navy shadow-md transition-all duration-150 hover:bg-slate-100 active:scale-[0.98] sm:px-5"
              >
                <Zap className="h-4 w-4" />
                <span>სცადე უფასოდ</span>
              </Link>
            </div>
          </nav>
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pb-4 pt-16 text-center sm:px-6 lg:px-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-teal shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-teal" />
            <span>ინოვაციური მიდგომა მიწის ნაკვეთებისთვის</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>

          <h1 className="mb-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            მიწის ანალიზი ერთი საკადასტრო კოდით
          </h1>

          <p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-200 opacity-90 sm:text-lg">
            აღმოაჩინე ზონირების კოეფიციენტები, იურიდიული სტატუსი და
            რეგულაციები წამებში.
          </p>

          <div className="flex flex-col items-center gap-4 text-xs font-semibold text-slate-200 opacity-80 sm:flex-row sm:gap-8 sm:text-sm">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-[18px] w-[18px] text-teal" />
              <span>საჯარო რეესტრის სინქრონიზაცია</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-[18px] w-[18px] text-white/90" />
              <span>K1, K2, K3 კოეფიციენტები</span>
            </div>
            <div className="flex items-center gap-2">
              <Gavel className="h-[18px] w-[18px] text-white/90" />
              <span>სამშენებლო ნორმები</span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= FLOATING SEARCH / DATA PREVIEW ================= */}
      <section className="relative z-30 mx-auto -mt-20 max-w-6xl px-4 sm:-mt-24 sm:px-6 lg:px-12">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xl sm:p-6 lg:p-8">
          {/* Search bar (static preview — links through to the live demo) */}
          <div className="mb-8 flex flex-col items-center gap-3 md:flex-row">
            <div className="relative w-full flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <MapPin className="h-5 w-5" />
              </div>
              <input
                type="text"
                readOnly
                defaultValue="01.14.03.024.015"
                aria-label="საკადასტრო კოდის მაგალითი"
                className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-12 pr-24 font-mono text-base text-[#0A1128] outline-none"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                  EPSG:32638
                </span>
              </div>
            </div>
            <Link
              href="/demo"
              className="flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-navy px-8 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:bg-navy/90 hover:shadow-lg active:scale-[0.98] md:w-auto"
            >
              <Search className="h-[18px] w-[18px]" />
              <span>ძებნა</span>
            </Link>
          </div>

          {/* Data preview grid */}
          <div className="border-t border-slate-100 pt-6">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-teal" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  ნაპოვნია აქტიური ჩანაწერი
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                <span>განახლებულია: 10 წთ-ის წინ</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Cadastral ID & District */}
              <div className="rounded-xl border border-navy/10 bg-navy/5 p-4 transition-colors hover:border-navy/20">
                <div className="mb-1.5 flex items-center justify-between text-slate-500">
                  <span className="text-xs font-medium">საკადასტრო კოდი</span>
                  <Hash className="h-4 w-4 text-slate-400" />
                </div>
                <div className="font-mono text-lg font-bold text-navy">
                  01.14.03.024.015
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-600">
                  <MapPin className="h-3 w-3 text-navy" />
                  <span>ვაკე-საბურთალო, თბილისი</span>
                </div>
              </div>

              {/* Area */}
              <div className="rounded-xl border border-navy/10 bg-navy/5 p-4 transition-colors hover:border-navy/20">
                <div className="mb-1.5 flex items-center justify-between text-slate-500">
                  <span className="text-xs font-medium">
                    დაზუსტებული ფართობი
                  </span>
                  <Ruler className="h-4 w-4 text-slate-400" />
                </div>
                <div className="text-lg font-bold text-[#0A1128]">
                  1,450 <span className="text-sm font-normal text-slate-500">მ²</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs font-medium text-teal">
                  <BadgeCheck className="h-3 w-3" />
                  <span>საზღვრები დაზუსტებულია</span>
                </div>
              </div>

              {/* Functional zone */}
              <div className="rounded-xl border border-navy/10 bg-navy/5 p-4 transition-colors hover:border-navy/20">
                <div className="mb-1.5 flex items-center justify-between text-slate-500">
                  <span className="text-xs font-medium">ფუნქციური ზონა</span>
                  <Building className="h-4 w-4 text-slate-400" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#0A1128]">
                    საცხოვრებელი 6
                  </span>
                  <span className="rounded border border-navy/20 bg-navy/10 px-2 py-0.5 text-xs font-semibold text-navy">
                    სზ-6
                  </span>
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  მაღალი ინტენსივობის განაშენიანება
                </div>
              </div>

              {/* Coefficients */}
              <div className="rounded-xl border border-navy/10 bg-navy/5 p-4 transition-colors hover:border-navy/20">
                <div className="mb-1.5 flex items-center justify-between text-slate-500">
                  <span className="text-xs font-medium">კოეფიციენტები</span>
                  <Calculator className="h-4 w-4 text-slate-400" />
                </div>
                <div className="grid grid-cols-3 gap-1 text-center">
                  <div className="rounded border border-slate-200/60 bg-white px-1.5 py-1">
                    <span className="block text-xs text-slate-400">K1</span>
                    <span className="text-base font-bold text-navy">0.5</span>
                  </div>
                  <div className="rounded border border-slate-200/60 bg-white px-1.5 py-1">
                    <span className="block text-xs text-slate-400">K2</span>
                    <span className="text-base font-bold text-navy">2.5</span>
                  </div>
                  <div className="rounded border border-slate-200/60 bg-white px-1.5 py-1">
                    <span className="block text-xs text-slate-400">K3</span>
                    <span className="text-base font-bold text-navy">0.3</span>
                  </div>
                </div>
                <div className="mt-1.5 flex items-center justify-center gap-1 text-xs font-medium text-teal">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>სრული სამშენებლო პოტენციალი</span>
                </div>
              </div>
            </div>

            {/* Status bar */}
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <span className="flex items-center gap-1">
                  <strong className="text-slate-700">
                    იურიდიული სტატუსი:
                  </strong>
                  <span className="font-medium text-teal">
                    აქტიური საკუთრება (დაუყადაღებელი)
                  </span>
                </span>
                <span className="hidden text-slate-300 sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <strong className="text-slate-700">
                    უფლების რეგისტრაცია:
                  </strong>{" "}
                  N 88202341109
                </span>
              </div>
              <a
                className="group flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-navy/80"
                href="#pricing"
              >
                <span>სრული ანალიტიკური ბარათის ნახვა</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-12 lg:py-24" id="features">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy sm:text-sm">
            უპირატესობები
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            რატომ LandGuide?
          </h2>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            ჩვენ ვაერთიანებთ ფრაგმენტულ საჯარო მონაცემებს და ხელოვნურ
            ინტელექტს ერთ ინტუიციურ სამუშაო სივრცეში, რათა გავამარტივოთ
            მიწის ნაკვეთის დეტალების მოძიება
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1: Data aggregation */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-navy/10 bg-navy/5 text-navy">
                <Network className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#0A1128]">
                მონაცემთა აგრეგაცია
              </h3>
              <p className="mb-6 leading-relaxed text-slate-600">
                ყველა ფრაგმენტული საჯარო მონაცემი მოქნილი და გასაგები სახით
                ერთ სივრცეში.
              </p>
            </div>
            <div className="space-y-2.5 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2 text-sm">
                <span className="flex items-center gap-2 text-slate-700">
                  <FileText className="h-4 w-4 text-navy" />
                  ფრაგმენტული მონაცემები
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-teal">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" /> ერთ
                  სივრცეში
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2 text-sm">
                <span className="flex items-center gap-2 text-slate-700">
                  <Database className="h-4 w-4 text-navy" />
                  ნაკვეთის ძირითადი ინფო
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-teal">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" /> მზა
                  სტრუქტურა
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2 text-sm">
                <span className="flex items-center gap-2 text-slate-700">
                  <Search className="h-4 w-4 text-navy" />
                  ტექსტური აგრეგაცია
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-teal">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" />{" "}
                  სწრაფი ძიება
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Automated zoning */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-navy/10 bg-navy/5 text-navy">
                <Compass className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#0A1128]">
                ავტომატური ზონირება
              </h3>
              <p className="mb-6 leading-relaxed text-slate-600">
                K1, K2, K3 კოეფიციენტების მყისიერი გათვლები ნაკვეთისთვის.
                მაქსიმალური სამშენებლო მოცულობისა და მწვანე ზონის ავტომატური
                კალკულატორი.
              </p>
            </div>
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-slate-600">
                    განაშენიანების ინტენსივობა (K2 = 2.5)
                  </span>
                  <span className="font-bold text-navy">3,625 მ²</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[78%] rounded-full bg-navy" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-slate-600">
                    ნაკვეთის განაშენიანების ფართი (K1 = 0.5)
                  </span>
                  <span className="font-bold text-navy">725 მ²</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-1/2 rounded-full bg-navy/60" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-slate-600">
                    გამწვანების კოეფიციენტი (K3 = 0.3)
                  </span>
                  <span className="font-bold text-teal">435 მ²</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[30%] rounded-full bg-teal" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: AI assistant */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-navy/10 bg-navy/5 text-navy">
                <Bot className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#0A1128]">
                AI ასისტენტი
              </h3>
              <p className="mb-6 leading-relaxed text-slate-600">
                პასუხები რეგულაციებზე რეალური სახელმწიფო ციტატებით. აღარ
                არის საჭირო ასობით გვერდიანი სამშენებლო კოდექსის ხელით
                შესწავლა.
              </p>
            </div>
            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900 p-3.5 text-white">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <MessageCircle className="h-3.5 w-3.5" />
                <span>მოთხოვნის მაგალითი:</span>
              </div>
              <p className="text-xs italic text-slate-300">
                &quot;შეიძლება თუ არა ამ ნაკვეთზე 5-სართულიანი საცხოვრებელი
                კორპუსის აშენება?&quot;
              </p>
              <div className="border-t border-slate-800 pt-2 text-xs text-slate-400">
                <span className="font-semibold text-coral">პასუხი:</span>{" "}
                დაშვებულია. შესაბამისობაშია ქ. თბილისის №39-18 დადგენილებით
                დამტკიცებულ სზ-6 პარამეტრებთან.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        className="border-y border-slate-200/60 bg-slate-50 py-20 lg:py-24"
        id="how-it-works"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy sm:text-sm">
              პროცესი
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              როგორ მუშაობს პლატფორმა
            </h2>
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              ოთხი მარტივი ნაბიჯი საკადასტრო კოდიდან ოფიციალურ ანალიტიკურ
              დასკვნამდე
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-[10%] right-[10%] top-10 hidden h-0.5 bg-gradient-to-r from-navy/20 via-navy to-navy/20 md:block"
            />
            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
              {[
                {
                  icon: MapPin,
                  step: "ნაბიჯი 1",
                  title: "შეიყვანე საკადასტრო კოდი",
                  desc: "შეიყვანეთ ნებისმიერი ნაკვეთის 11-ნიშნა ან სრული კოდი საძიებო ველში.",
                },
                {
                  icon: Database,
                  step: "ნაბიჯი 2",
                  title: "მიიღე ნაკვეთის სრული მონაცემები",
                  desc: "საჯარო რეესტრისა და მუნიციპალური ზონირების მყისიერი სინთეზი ერთ ეკრანზე.",
                },
                {
                  icon: Brain,
                  step: "ნაბიჯი 3",
                  title: "ჰკითხე AI ასისტენტს",
                  desc: "მიიღე კონკრეტული განმარტება სამშენებლო ნებართვებსა და შეზღუდვებზე კანონმდებლობით.",
                },
                {
                  icon: FileText,
                  step: "ნაბიჯი 4",
                  title: "მიიღე AI ჩატის შეჯამება",
                  desc: "ოფიციალური ანალიტიკური დოკუმენტი არქიტექტორებისა და ინვესტორებისთვის.",
                },
              ].map(({ icon: Icon, step, title, desc }) => (
                <div
                  key={step}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-navy bg-white text-navy shadow-md transition-all duration-200 group-hover:scale-110 group-hover:bg-navy group-hover:text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-navy">
                    {step}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-[#0A1128]">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-12 lg:py-24"
        id="pricing"
      >
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy sm:text-sm">
            ღირებულება
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            ტარიფები და პაკეტები
          </h2>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            აირჩიეთ თქვენს საჭიროებებზე მორგებული გეგმა — მოქალაქეებისთვის
            თუ პროფესიონალებისთვის
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          {/* Basic / free */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md lg:p-10">
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                მოქალაქეებისთვის
              </div>
              <h3 className="mb-2 text-xl font-bold text-navy">
                უფასო პაკეტი
              </h3>
              <p className="mb-6 text-sm text-slate-600">
                საჯარო მონაცემების მყისიერი გადამოწმება და ნაკვეთის
                ძირითადი პარამეტრების გაცნობა.
              </p>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#0A1128]">
                  0 ₾
                </span>
                <span className="text-sm text-slate-500">/ უფასოდ</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-teal" />
                  <span>საკადასტრო კოდით ძებნა მთელ საქართველოში</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-teal" />
                  <span>დაზუსტებული ფართობისა და საზღვრების ნახვა</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-teal" />
                  <span>ფუნქციური ზონის იდენტიფიცირება</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <XCircle className="h-[18px] w-[18px] shrink-0 text-slate-300" />
                  <span>K1, K2, K3 კოეფიციენტების დეტალური გათვლა</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <XCircle className="h-[18px] w-[18px] shrink-0 text-slate-300" />
                  <span>AI იურიდიული ასისტენტი და რეგულაციები</span>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <Link
                href="/demo"
                className="block w-full rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-navy transition-all hover:bg-slate-50"
              >
                დაიწყე უფასოდ
              </Link>
            </div>
          </div>

          {/* Pro */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-navy/30 bg-navy p-8 text-white shadow-2xl lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal/20 blur-3xl"
            />
            <div className="absolute right-6 top-6">
              <span className="rounded-full bg-coral px-3 py-1 text-xs font-semibold text-white shadow">
                პოპულარული
              </span>
            </div>
            <div className="relative z-10">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-teal">
                არქიტექტორებისა და დეველოპერებისთვის
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Pro პაკეტი
              </h3>
              <p className="mb-6 text-sm text-slate-300">
                K-კოეფიციენტების სრული გათვლა, AI სამშენებლო ასისტენტი და
                ექსპორტირებული PDF რეპორტი.
              </p>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">15 ₾</span>
                <span className="text-sm text-slate-300">
                  / ერთჯერადი ანგარიში
                </span>
              </div>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-teal" />
                  <span>ყველა უფასო ფუნქციონალი</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-teal" />
                  <span>
                    K1, K2, K3 კოეფიციენტების მაქსიმალური ათვისების მოდელი
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-teal" />
                  <span>
                    შეუზღუდავი შეკითხვები AI იურიდიულ ასისტენტთან
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-teal" />
                  <span>AI ჩატის სრული შეჯამება და ისტორია</span>
                </li>
              </ul>
            </div>
            <div className="relative z-10 pt-8">
              <button
                type="button"
                disabled
                title="მალე ხელმისაწვდომი იქნება"
                className="block w-full rounded-lg bg-white/20 px-6 py-3 text-center font-semibold text-white shadow-lg backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-70"
              >
                შეიძინე Pro ანგარიში
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-navy text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 text-xs sm:px-6 md:flex-row lg:px-12">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 p-1.5">
              <Image
                src="/logo.png"
                alt="LandGuide"
                width={318}
                height={299}
                className="h-full w-full object-contain"
              />
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
