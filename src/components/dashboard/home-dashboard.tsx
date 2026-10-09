"use client";

import {ArrowRight, BookOpen, CalendarDays, CircleHelp, ExternalLink, FileText, GraduationCap, Search, Sparkles} from "lucide-react";
import {useMemo, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {examinations} from "@/data/examinations";
import {notices} from "@/data/notices";
import {Link, useRouter} from "@/i18n/navigation";
import {formatDate} from "@/lib/utils";
import type {Locale, NoticeCategory} from "@/types";
import {DemoBadge} from "@/components/ui/demo-badge";

type PriorityTab = "action" | "coming" | "updates";

const noticeCategories: Array<NoticeCategory | "all"> = ["all", "examination", "results", "deadline", "general"];

export function HomeDashboard() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [priorityTab, setPriorityTab] = useState<PriorityTab>("action");
  const [query, setQuery] = useState("");
  const [noticeQuery, setNoticeQuery] = useState("");
  const [noticeCategory, setNoticeCategory] = useState<NoticeCategory | "all">("all");

  const priorityItems = priorityTab === "action"
    ? notices.filter((notice) => notice.requiresAction)
    : priorityTab === "coming"
      ? examinations.filter((exam) => exam.date && exam.status !== "completed")
      : notices.filter((notice) => !notice.requiresAction).slice(0, 3);

  const filteredNotices = useMemo(() => notices.filter((notice) => {
    const matchesQuery = `${notice.title} ${notice.summary}`.toLowerCase().includes(noticeQuery.toLowerCase());
    const matchesCategory = noticeCategory === "all" || notice.category === noticeCategory;
    return matchesQuery && matchesCategory;
  }), [noticeCategory, noticeQuery]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    if (value) router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const tabs: Array<{id: PriorityTab; label: string}> = [
    {id: "action", label: t("home.actionRequired")},
    {id: "coming", label: t("home.comingUp")},
    {id: "updates", label: t("home.newUpdates")}
  ];

  return <div className="space-y-8 lg:space-y-10">
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-stretch">
      <div className="panel overflow-hidden shadow-hard">
        <div className="border-b-2 border-ink bg-sage px-5 py-3 sm:px-7"><p className="eyebrow">{t("home.eyebrow")}</p></div>
        <div className="p-5 sm:p-7"><div className="max-w-3xl"><h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">{t("home.title")}</h1><p className="mt-4 max-w-2xl text-base text-secondary sm:text-lg">{t("home.description")}</p></div>
          <form className="mt-6" onSubmit={submitSearch}><label className="sr-only" htmlFor="home-search">{t("nav.search")}</label><div className="flex flex-col gap-2 sm:flex-row"><div className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true" size={19} /><input id="home-search" className="input-base pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("home.searchPlaceholder")} /></div><button type="submit" className="hard-button"><Search aria-hidden="true" size={18} />{t("nav.search")}</button></div></form>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row"><Link href="/exams" className="soft-button"><GraduationCap aria-hidden="true" size={18} />{t("home.goToExams")}</Link><Link href="/results" className="soft-button"><FileText aria-hidden="true" size={18} />{t("home.goToResults")}</Link></div>
        </div>
      </div>
      <aside className="panel flex flex-col bg-teal p-5 text-white shadow-hard sm:p-6"><div className="flex items-center justify-between"><span className="font-display text-sm font-bold tracking-wide">{t("home.pulseDemo")}</span><Sparkles aria-hidden="true" size={22} /></div><p className="mt-8 font-display text-2xl font-bold leading-tight">{t("home.tagline")}</p><p className="mt-3 text-sm text-white/80">{t("home.sourceNote")}</p><a href="https://ktu.edu.in/" target="_blank" rel="noreferrer" className="focus-ring mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-sm font-bold underline decoration-coral decoration-2 underline-offset-4">{t("common.source")}<ExternalLink aria-hidden="true" size={16} /></a></aside>
    </section>

    <section className="panel overflow-hidden shadow-hard" aria-labelledby="priority-heading">
      <div className="flex flex-col gap-4 border-b-2 border-ink bg-white p-5 sm:flex-row sm:items-end sm:justify-between sm:px-6"><div><p className="eyebrow">{t("home.priorityEyebrow")}</p><h2 id="priority-heading" className="mt-1 font-display text-2xl font-bold">{t("home.priorityTitle")}</h2><p className="mt-1 max-w-2xl text-sm text-secondary">{t("home.priorityDescription")}</p></div><DemoBadge /></div>
      <div className="border-b-2 border-ink bg-muted px-3 pt-3 sm:px-6"><div className="flex gap-2 overflow-x-auto" role="tablist" aria-label={t("home.priorityTitle")}>{tabs.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={priorityTab === tab.id} className={`focus-ring shrink-0 rounded-t-md border-2 border-b-0 border-ink px-3 py-2 text-sm font-bold transition ${priorityTab === tab.id ? "bg-white" : "bg-sage hover:bg-white"}`} onClick={() => setPriorityTab(tab.id)}>{tab.label}</button>)}</div></div>
      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">{priorityItems.map((item) => "requiresAction" in item ? <article key={item.id} className="rounded-md border-2 border-ink bg-white p-4"><div className="flex flex-wrap gap-2"><DemoBadge /><span className="text-xs font-bold text-secondary">{t(`categories.${item.category}`)}</span></div><h3 className="mt-3 font-display text-lg font-bold leading-snug">{item.title}</h3><p className="mt-2 text-sm text-secondary">{item.summary}</p>{item.deadline ? <p className="mt-4 border-l-4 border-coral pl-3 text-sm font-semibold">{t("home.deadline")}: {formatDate(item.deadline, locale)}</p> : null}<a href={item.sourceUrl} target="_blank" rel="noreferrer" className="focus-ring mt-4 inline-flex items-center gap-2 text-sm font-bold text-teal underline decoration-2 underline-offset-4">{t("common.verifyLive")}<ExternalLink aria-hidden="true" size={15} /></a></article> : <article key={item.id} className="rounded-md border-2 border-ink bg-white p-4"><div className="flex flex-wrap gap-2"><DemoBadge /><span className="text-xs font-bold text-secondary">{item.type}</span></div><h3 className="mt-3 font-display text-lg font-bold leading-snug">{item.name}</h3><p className="mt-2 text-sm text-secondary">{item.programme} · {item.semester} · {item.academicYear}</p>{item.date ? <p className="mt-4 border-l-4 border-coral pl-3 text-sm font-semibold">{formatDate(item.date, locale)}</p> : null}<a href={item.sourceUrl} target="_blank" rel="noreferrer" className="focus-ring mt-4 inline-flex items-center gap-2 text-sm font-bold text-teal underline decoration-2 underline-offset-4">{t("common.verifyLive")}<ExternalLink aria-hidden="true" size={15} /></a></article>)}</div>
    </section>

    <section aria-labelledby="access-heading"><div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><p className="eyebrow">{t("home.startHere")}</p><h2 id="access-heading" className="mt-1 font-display text-2xl font-bold">{t("home.quickAccess")}</h2><p className="mt-1 text-sm text-secondary">{t("home.quickAccessDescription")}</p></div></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"><Link href="/exams" className="panel focus-ring group p-4 transition hover:-translate-y-0.5 hover:bg-sage hover:shadow-hard-sm"><GraduationCap aria-hidden="true" size={22} /><h3 className="mt-7 font-display text-base font-bold">{t("nav.exams")}</h3><ArrowRight aria-hidden="true" className="mt-2 transition group-hover:translate-x-1" size={18} /></Link><Link href="/results" className="panel focus-ring group p-4 transition hover:-translate-y-0.5 hover:bg-sage hover:shadow-hard-sm"><FileText aria-hidden="true" size={22} /><h3 className="mt-7 font-display text-base font-bold">{t("nav.results")}</h3><ArrowRight aria-hidden="true" className="mt-2 transition group-hover:translate-x-1" size={18} /></Link><a href="#announcements" className="panel focus-ring group p-4 transition hover:-translate-y-0.5 hover:bg-sage hover:shadow-hard-sm"><CalendarDays aria-hidden="true" size={22} /><h3 className="mt-7 font-display text-base font-bold">{t("home.latestAnnouncements")}</h3><ArrowRight aria-hidden="true" className="mt-2 transition group-hover:translate-x-1" size={18} /></a><a href="https://ktu.edu.in/" target="_blank" rel="noreferrer" className="panel focus-ring group p-4 transition hover:-translate-y-0.5 hover:bg-sage hover:shadow-hard-sm"><BookOpen aria-hidden="true" size={22} /><h3 className="mt-7 font-display text-base font-bold">{t("home.academicResources")}</h3><ExternalLink aria-hidden="true" className="mt-2 transition group-hover:translate-x-1" size={18} /></a><button type="button" onClick={() => window.dispatchEvent(new Event("open-ask-pulse"))} className="panel focus-ring group p-4 text-left transition hover:-translate-y-0.5 hover:bg-sage hover:shadow-hard-sm"><CircleHelp aria-hidden="true" size={22} /><h3 className="mt-7 font-display text-base font-bold">{t("home.helpFaq")}</h3><ArrowRight aria-hidden="true" className="mt-2 transition group-hover:translate-x-1" size={18} /></button></div></section>

    <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <section className="panel p-5 shadow-hard sm:p-6" aria-labelledby="upcoming-heading"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">{t("home.examDesk")}</p><h2 id="upcoming-heading" className="mt-1 font-display text-2xl font-bold">{t("home.upcomingExams")}</h2><p className="mt-1 text-sm text-secondary">{t("home.upcomingDescription")}</p></div><DemoBadge /></div><div className="mt-5 space-y-3">{examinations.filter((exam) => exam.date).slice(0, 3).map((exam) => <article key={exam.id} className="rounded-md border-2 border-ink bg-muted p-3"><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold">{exam.name}</h3><p className="mt-1 text-sm text-secondary">{exam.academicYear} · {exam.type} · {exam.semester}</p></div><span className="text-right text-sm font-bold text-teal">{formatDate(exam.date, locale)}</span></div><Link href="/exams" className="focus-ring mt-3 inline-flex items-center gap-1 text-sm font-bold text-teal underline decoration-2 underline-offset-4">{t("common.viewDetails")}<ArrowRight aria-hidden="true" size={15} /></Link></article>)}</div><Link href="/exams" className="soft-button mt-5 w-full">{t("home.allExams")}</Link></section>
      <section id="announcements" className="panel p-5 shadow-hard sm:p-6" aria-labelledby="announcements-heading"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="eyebrow">{t("home.noticeboard")}</p><h2 id="announcements-heading" className="mt-1 font-display text-2xl font-bold">{t("home.announcementsTitle")}</h2><p className="mt-1 text-sm text-secondary">{t("home.announcementsDescription")}</p></div><DemoBadge /></div><div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]"><input className="input-base" value={noticeQuery} onChange={(event) => setNoticeQuery(event.target.value)} placeholder={t("home.searchPlaceholder")} aria-label={t("home.searchPlaceholder")} /><select className="input-base sm:w-52" aria-label={t("common.category")} value={noticeCategory} onChange={(event) => setNoticeCategory(event.target.value as NoticeCategory | "all")}>{noticeCategories.map((category) => <option key={category} value={category}>{category === "all" ? t("home.filterAll") : t(`categories.${category}`)}</option>)}</select></div><div className="mt-4 divide-y-2 divide-ink border-y-2 border-ink">{filteredNotices.length ? filteredNotices.map((notice) => <article key={notice.id} className="py-4"><div className="flex flex-wrap items-center gap-2"><DemoBadge /><span className="text-xs font-bold text-secondary">{t(`categories.${notice.category}`)} · {notice.publishedAt ? formatDate(notice.publishedAt, locale) : "—"}</span></div><h3 className="mt-2 font-display text-lg font-bold">{notice.title}</h3><p className="mt-1 text-sm text-secondary">{notice.summary}</p><a className="focus-ring mt-3 inline-flex items-center gap-2 text-sm font-bold text-teal underline decoration-2 underline-offset-4" href={notice.sourceUrl} target="_blank" rel="noreferrer">{t("common.verifyLive")}<ExternalLink aria-hidden="true" size={15} /></a></article>) : <p className="py-6 text-center text-sm text-secondary">{t("home.noAnnouncements")}</p>}</div></section>
    </section>

    <section className="panel border-coral bg-sage p-5 shadow-hard sm:p-7" aria-labelledby="help-heading"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow">{t("home.askPulseEyebrow")}</p><h2 id="help-heading" className="mt-1 font-display text-2xl font-bold">{t("home.helpTitle")}</h2><p className="mt-2 max-w-2xl text-secondary">{t("home.helpDescription")}</p><div className="mt-5 flex flex-wrap gap-2">{[t("home.questionResult"), t("home.questionExam"), t("home.questionNotice"), t("home.questionLanguage")].map((question) => <button key={question} type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-ask-pulse", {detail: question}))} className="focus-ring rounded-md border-2 border-ink bg-white px-3 py-2 text-left text-sm font-semibold transition hover:bg-ivory">{question}</button>)}</div></div><button type="button" className="hard-button" onClick={() => window.dispatchEvent(new Event("open-ask-pulse"))}><CircleHelp aria-hidden="true" size={18} />{t("nav.help")}</button></div></section>
  </div>;
}
