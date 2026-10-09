"use client";

import {AlertTriangle, ArrowLeft, ExternalLink, Filter, RotateCcw, Search, WifiOff} from "lucide-react";
import {useEffect, useMemo, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {useSearchParams} from "next/navigation";
import {examinations} from "@/data/examinations";
import {Link, usePathname, useRouter} from "@/i18n/navigation";
import {formatDate} from "@/lib/utils";
import type {ExamStatus, Locale} from "@/types";
import {DemoBadge} from "@/components/ui/demo-badge";

type Filters = {query: string; year: string; type: string; programme: string; semester: string};
const blankFilters: Filters = {query: "", year: "", type: "", programme: "", semester: ""};

export function ExaminationsPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => ({
    query: searchParams.get("q") ?? "",
    year: searchParams.get("year") ?? "",
    type: searchParams.get("type") ?? "",
    programme: searchParams.get("programme") ?? "",
    semester: searchParams.get("semester") ?? ""
  }));
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  const years = Array.from(new Set(examinations.map((exam) => exam.academicYear)));
  const types = Array.from(new Set(examinations.map((exam) => exam.type)));
  const programmes = Array.from(new Set(examinations.map((exam) => exam.programme).filter(Boolean))) as string[];
  const semesters = Array.from(new Set(examinations.map((exam) => exam.semester).filter(Boolean))) as string[];
  const filterActive = Object.values(filters).some(Boolean);

  const results = useMemo(() => examinations.filter((exam) => {
    const search = `${exam.name} ${exam.academicYear} ${exam.type} ${exam.programme} ${exam.semester}`.toLowerCase();
    return (!filters.query || search.includes(filters.query.toLowerCase())) &&
      (!filters.year || exam.academicYear === filters.year) &&
      (!filters.type || exam.type === filters.type) &&
      (!filters.programme || exam.programme === filters.programme) &&
      (!filters.semester || exam.semester === filters.semester);
  }), [filters]);

  const applyFilters = (next: Filters) => {
    setFilters(next);
    const params = new URLSearchParams();
    if (next.query) params.set("q", next.query);
    if (next.year) params.set("year", next.year);
    if (next.type) params.set("type", next.type);
    if (next.programme) params.set("programme", next.programme);
    if (next.semester) params.set("semester", next.semester);
    router.replace(params.size ? `${pathname}?${params.toString()}` : pathname);
  };
  const update = (key: keyof Filters, value: string) => applyFilters({...filters, [key]: value});
  const labels: Record<ExamStatus, string> = {
    scheduled: t("exams.statusScheduled"),
    tentative: t("exams.statusTentative"),
    completed: t("exams.statusCompleted"),
    "not-configured": t("exams.statusNotConfigured")
  };

  if (loading) return <section className="panel p-6 shadow-hard"><div className="animate-pulse"><div className="h-4 w-36 bg-sage" /><div className="mt-4 h-10 max-w-md bg-muted" /><div className="mt-8 grid gap-3 md:grid-cols-2"><div className="h-44 bg-muted" /><div className="h-44 bg-muted" /></div></div><p className="sr-only">{t("exams.initialLoading")}</p></section>;

  if (showError) return <section className="mx-auto max-w-2xl py-10"><div className="panel border-danger bg-white p-6 shadow-hard"><div className="flex size-12 items-center justify-center rounded-md border-2 border-danger bg-[#FBE9E8] text-danger"><WifiOff aria-hidden="true" size={24} /></div><p className="eyebrow mt-5 text-danger">{t("exams.demoState")}</p><h1 className="mt-1 font-display text-3xl font-bold">{t("exams.errorTitle")}</h1><p className="mt-3 text-secondary">{t("exams.errorDescription")}</p><button type="button" className="hard-button mt-6" onClick={() => setShowError(false)}>{t("common.retry")}</button></div></section>;

  return <div className="space-y-6">
    <section className="flex flex-col gap-5 border-b-2 border-ink pb-6 lg:flex-row lg:items-end lg:justify-between"><div><Link href="/" className="focus-ring inline-flex items-center gap-2 text-sm font-bold text-teal underline decoration-2 underline-offset-4"><ArrowLeft aria-hidden="true" size={16} />{t("exams.breadcrumb")}</Link><p className="eyebrow mt-5">{t("exams.eyebrow")}</p><h1 className="mt-1 font-display text-4xl font-bold tracking-tight">{t("exams.title")}</h1><p className="mt-2 max-w-2xl text-secondary">{t("exams.description")}</p></div><button type="button" className="soft-button self-start lg:self-auto" onClick={() => setShowError(true)}><AlertTriangle aria-hidden="true" size={17} />{t("exams.showError")}</button></section>

    <section className="panel p-4 shadow-hard sm:p-5" aria-labelledby="filters-heading"><div className="flex flex-col gap-3 border-b-2 border-ink pb-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2"><Filter aria-hidden="true" size={20} /><h2 id="filters-heading" className="font-display text-xl font-bold">{t("exams.filtersTitle")}</h2></div><div className="flex items-center gap-3"><span className="rounded-md border-2 border-ink bg-sage px-2 py-1 text-sm font-bold" aria-live="polite">{t("exams.matching", {count: results.length})}</span>{filterActive ? <button type="button" className="focus-ring inline-flex items-center gap-1 text-sm font-bold text-teal underline decoration-2 underline-offset-4" onClick={() => applyFilters(blankFilters)}><RotateCcw aria-hidden="true" size={15} />{t("common.reset")}</button> : null}</div></div>
      {filterActive ? <p className="mt-3 text-sm font-semibold text-teal">{t("exams.resetNotice")}</p> : null}
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5"><label className="md:col-span-2 xl:col-span-1"><span className="mb-1 block text-sm font-semibold">{t("exams.searchLabel")}</span><span className="relative block"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true" size={17} /><input className="input-base pl-9" value={filters.query} onChange={(event) => update("query", event.target.value)} placeholder={t("exams.searchPlaceholder")} /></span></label><label><span className="mb-1 block text-sm font-semibold">{t("common.year")}</span><select className="input-base" value={filters.year} onChange={(event) => update("year", event.target.value)}><option value="">{t("exams.allYears")}</option>{years.map((year) => <option key={year} value={year}>{year}</option>)}</select></label><label><span className="mb-1 block text-sm font-semibold">{t("common.type")}</span><select className="input-base" value={filters.type} onChange={(event) => update("type", event.target.value)}><option value="">{t("exams.allTypes")}</option>{types.map((type) => <option key={type} value={type}>{type}</option>)}</select></label><label><span className="mb-1 block text-sm font-semibold">{t("common.programme")}</span><select className="input-base" value={filters.programme} onChange={(event) => update("programme", event.target.value)}><option value="">{t("exams.allProgrammes")}</option>{programmes.map((programme) => <option key={programme} value={programme}>{programme}</option>)}</select></label><label><span className="mb-1 block text-sm font-semibold">{t("common.semester")}</span><select className="input-base" value={filters.semester} onChange={(event) => update("semester", event.target.value)}><option value="">{t("exams.allSemesters")}</option>{semesters.map((semester) => <option key={semester} value={semester}>{semester}</option>)}</select></label></div>
    </section>

    <section aria-labelledby="exam-results-heading"><div className="mb-4 flex items-center justify-between"><div><p className="eyebrow">{t("common.demoData")}</p><h2 id="exam-results-heading" className="mt-1 font-display text-2xl font-bold">{t("exams.available")}</h2></div><span className="text-sm font-semibold text-secondary">{t("exams.matching", {count: results.length})}</span></div>
      {results.length ? <div className="grid gap-4 lg:grid-cols-2">{results.map((exam) => <article key={exam.id} className="panel p-4 transition hover:-translate-y-0.5 hover:shadow-hard-sm sm:p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap gap-2"><DemoBadge /><span className="text-xs font-bold text-secondary">{exam.type}</span></div><h3 className="mt-3 font-display text-xl font-bold">{exam.name}</h3><p className="mt-2 text-sm text-secondary">{exam.programme} · {exam.semester} · {exam.academicYear}</p></div><span className={`w-fit rounded-md border-2 border-ink px-2 py-1 text-xs font-bold ${exam.status === "tentative" ? "bg-[#F6D991]" : exam.status === "not-configured" ? "bg-muted" : exam.status === "completed" ? "bg-sage" : "bg-coral"}`}>{labels[exam.status]}</span></div><dl className="mt-5 grid grid-cols-2 gap-3 border-y-2 border-ink py-3 text-sm"><div><dt className="text-secondary">{t("common.date")}</dt><dd className="mt-1 font-bold">{exam.date ? formatDate(exam.date, locale) : "—"}</dd></div><div><dt className="text-secondary">{t("common.status")}</dt><dd className="mt-1 font-bold">{labels[exam.status]}</dd></div></dl>{exam.status === "not-configured" ? <aside className="mt-4 flex gap-3 rounded-md border-2 border-ink bg-muted p-3"><AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0 text-warning" size={18} /><div><h4 className="font-semibold">{t("exams.unconfiguredTitle")}</h4><p className="mt-1 text-sm text-secondary">{t("exams.unconfiguredDescription")}</p></div></aside> : null}<a href={exam.sourceUrl} target="_blank" rel="noreferrer" className="focus-ring mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-teal underline decoration-2 underline-offset-4">{t("common.verifyLive")}<ExternalLink aria-hidden="true" size={16} /></a></article>)}</div> : <section className="panel border-dashed p-8 text-center"><h3 className="font-display text-2xl font-bold">{t("exams.emptyTitle")}</h3><p className="mx-auto mt-2 max-w-xl text-secondary">{t("exams.emptyDescription")}</p><button type="button" className="hard-button mt-5" onClick={() => applyFilters(blankFilters)}>{t("common.reset")}</button></section>}</section>
  </div>;
}
