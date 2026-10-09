"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {CheckCircle2, LockKeyhole, Printer, Search, ShieldCheck} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useLocale, useTranslations} from "next-intl";
import {sampleResults} from "@/data/sample-results";
import {resultLookupSchema, type ResultLookupValues} from "@/lib/validation";
import type {Locale, SampleResult} from "@/types";
import {DemoBadge} from "@/components/ui/demo-badge";

export function ResultsPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [result, setResult] = useState<SampleResult | null>(null);
  const [loading, setLoading] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm<ResultLookupValues>({resolver: zodResolver(resultLookupSchema)});

  const onSubmit = ({semester}: ResultLookupValues) => {
    setLoading(true);
    window.setTimeout(() => {
      setResult(sampleResults.find((item) => item.semester === semester) ?? null);
      setLoading(false);
    }, 550);
  };

  return <div className="space-y-7">
    <section className="grid gap-5 border-b-2 border-ink pb-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"><div><p className="eyebrow">{t("results.eyebrow")}</p><h1 className="mt-1 font-display text-4xl font-bold tracking-tight">{t("results.title")}</h1><p className="mt-3 max-w-2xl text-secondary">{t("results.description")}</p></div><aside className="rounded-panel border-2 border-ink bg-sage p-4"><div className="flex gap-3"><ShieldCheck aria-hidden="true" className="shrink-0" size={22} /><div><h2 className="font-display font-bold">{t("results.privacyTitle")}</h2><p className="mt-1 text-sm text-secondary">{t("results.privacyDescription")}</p></div></div></aside></section>

    <section className="panel p-5 shadow-hard sm:p-6" aria-labelledby="lookup-title"><div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]"><div><DemoBadge /><h2 id="lookup-title" className="mt-4 font-display text-2xl font-bold">{t("results.lookupTitle")}</h2><p className="mt-2 text-secondary">{t("results.lookupDescription")}</p></div><form noValidate onSubmit={handleSubmit(onSubmit)} className="rounded-md border-2 border-ink bg-muted p-4"><label htmlFor="semester" className="text-sm font-bold">{t("results.semesterLabel")} <span className="text-danger">*</span></label><select id="semester" className={`input-base mt-2 ${errors.semester ? "border-danger" : ""}`} aria-invalid={Boolean(errors.semester)} aria-describedby={errors.semester ? "semester-error" : "semester-helper"} defaultValue="" {...register("semester")}><option value="" disabled>{t("results.semesterPlaceholder")}</option>{sampleResults.map((item) => <option key={item.id} value={item.semester}>{item.semester} · {item.academicYear}</option>)}</select><p id="semester-helper" className="mt-2 text-xs text-secondary">{t("results.helper")}</p>{errors.semester ? <p id="semester-error" role="alert" className="mt-2 text-sm font-semibold text-danger">{t("results.required")}</p> : null}<button type="submit" className="hard-button mt-4 w-full" disabled={loading}>{loading ? <><span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />{t("results.loading")}</> : <><Search aria-hidden="true" size={18} />{t("results.viewResult")}</>}</button></form></div>
    </section>

    {loading ? <section className="panel p-6" aria-live="polite"><div className="flex items-center gap-3"><span className="size-5 animate-spin rounded-full border-2 border-teal border-t-transparent" /><p className="font-semibold">{t("results.loading")}</p></div></section> : null}
    {result && !loading ? <GradeCard result={result} locale={locale} /> : null}
  </div>;
}

function GradeCard({result, locale}: {result: SampleResult; locale: Locale}) {
  const t = useTranslations();
  const status = result.resultStatus === "Passed" ? t("results.passed") : t("results.pending");

  return <section className="print-card panel overflow-hidden shadow-hard" aria-labelledby="grade-card-title"><header className="flex flex-col gap-4 border-b-2 border-ink bg-teal p-5 text-white sm:flex-row sm:items-center sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><DemoBadge long /><span className="text-xs font-bold text-white/80">{t("results.gradeCard")}</span></div><h2 id="grade-card-title" className="mt-3 font-display text-2xl font-bold">{result.programme}</h2></div><button type="button" className="no-print focus-ring inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-md border-2 border-white bg-white px-3 text-sm font-bold text-ink hover:bg-sage" onClick={() => window.print()}><Printer aria-hidden="true" size={17} />{t("common.print")}</button></header>
    <div className="p-5 sm:p-6"><div className="grid gap-4 border-b-2 border-ink pb-5 sm:grid-cols-2 lg:grid-cols-4"><Info label={t("results.student")} value={result.studentName} /><Info label={t("results.id")} value={result.studentId} /><Info label={t("common.semester")} value={result.semester} /><Info label={t("common.year")} value={result.academicYear} /></div>
      <div className="mt-5 hidden overflow-x-auto sm:block"><table className="w-full border-collapse text-sm"><thead><tr className="border-y-2 border-ink text-left"><th className="p-3 font-display text-xs uppercase tracking-wide">{t("results.subjectCode")}</th><th className="p-3 font-display text-xs uppercase tracking-wide">{t("results.subjectName")}</th><th className="p-3 font-display text-xs uppercase tracking-wide">{t("results.credits")}</th><th className="p-3 font-display text-xs uppercase tracking-wide">{t("results.grade")}</th></tr></thead><tbody>{result.subjects.map((subject) => <tr key={subject.code} className="border-b border-ink"><td className="p-3 font-semibold">{subject.code}</td><td className="p-3">{subject.name}</td><td className="p-3">{subject.credits}</td><td className="p-3"><span className="inline-flex min-w-9 justify-center rounded-sm border-2 border-ink bg-sage px-2 py-1 font-bold">{subject.grade}</span></td></tr>)}</tbody></table></div>
      <div className="mt-5 space-y-3 sm:hidden">{result.subjects.map((subject) => <article key={subject.code} className="rounded-md border-2 border-ink bg-muted p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold text-secondary">{subject.code}</p><h3 className="mt-1 font-semibold">{subject.name}</h3></div><span className="rounded-sm border-2 border-ink bg-sage px-2 py-1 font-bold">{subject.grade}</span></div><p className="mt-2 text-sm text-secondary">{t("results.credits")}: {subject.credits}</p></article>)}</div>
      <div className="mt-6 grid gap-4 border-t-2 border-ink pt-5 sm:grid-cols-[1fr_auto_auto]"><div className="rounded-md border-2 border-ink bg-muted p-4"><p className="text-xs font-bold uppercase tracking-wide text-secondary">{t("results.resultStatus")}</p><p className="mt-1 inline-flex items-center gap-2 font-display text-xl font-bold"><CheckCircle2 aria-hidden="true" className="text-success" size={20} />{status}</p></div>{result.sgpa !== undefined ? <div className="rounded-md border-2 border-ink bg-coral p-4"><p className="text-xs font-bold uppercase tracking-wide">{t("results.sgpa")}</p><p className="mt-1 font-display text-3xl font-bold">{result.sgpa.toFixed(2)}</p></div> : null}<div className="rounded-md border-2 border-ink bg-white p-4"><p className="text-xs font-bold uppercase tracking-wide text-secondary">{t("common.status")}</p><p className="mt-1 inline-flex items-center gap-2 font-semibold"><LockKeyhole aria-hidden="true" size={16} />{t("common.demoData")}</p></div></div>
      <p className="mt-4 text-xs leading-5 text-secondary">{t("results.calculation")}</p>
    </div>
  </section>;
}

function Info({label, value}: {label: string; value: string}) {
  return <div><p className="text-xs font-bold uppercase tracking-wide text-secondary">{label}</p><p className="mt-1 font-semibold">{value}</p></div>;
}
