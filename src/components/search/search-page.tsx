"use client";

import {ArrowRight, Search, X} from "lucide-react";
import {useEffect, useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {useSearchParams} from "next/navigation";
import {Link, useRouter} from "@/i18n/navigation";
import {highlightMatch, searchPortal} from "@/lib/utils";
import type {SearchResult} from "@/types";

const groups: Array<SearchResult["type"]> = ["notice", "examination", "resource"];

export function SearchPage() {
  const t = useTranslations();
  const params = useSearchParams();
  const router = useRouter();
  const initialQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => setQuery(initialQuery), [initialQuery]);
  const results = useMemo(() => searchPortal(initialQuery), [initialQuery]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    router.replace(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  };

  const clear = () => {
    setQuery("");
    router.replace("/search");
  };

  return <div className="mx-auto max-w-5xl space-y-7"><section className="border-b-2 border-ink pb-7"><p className="eyebrow">{t("search.eyebrow")}</p><h1 className="mt-1 font-display text-4xl font-bold tracking-tight">{t("search.title")}</h1><p className="mt-3 max-w-3xl text-secondary">{t("search.description")}</p><form onSubmit={submit} className="mt-6 flex flex-col gap-2 sm:flex-row"><div className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true" size={19} /><input className="input-base pl-10 pr-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("search.placeholder")} aria-label={t("search.placeholder")} />{query ? <button type="button" className="focus-ring absolute right-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md hover:bg-muted" aria-label={t("common.clear")} onClick={clear}><X aria-hidden="true" size={17} /></button> : null}</div><button type="submit" className="hard-button"><Search aria-hidden="true" size={18} />{t("common.search")}</button></form></section>
    {!initialQuery ? <section className="panel p-7 shadow-hard"><h2 className="font-display text-2xl font-bold">{t("search.startTitle")}</h2><p className="mt-2 text-secondary">{t("search.startDescription")}</p></section> : null}
    {initialQuery && !results.length ? <section className="panel border-dashed p-8 text-center"><h2 className="font-display text-2xl font-bold">{t("search.emptyTitle")}</h2><p className="mx-auto mt-2 max-w-lg text-secondary">{t("search.emptyDescription")}</p><button type="button" className="hard-button mt-5" onClick={clear}>{t("common.clear")}</button></section> : null}
    {initialQuery && results.length ? <section><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="font-display text-2xl font-bold">{t("search.results", {count: results.length})}</h2><span className="demo-label">{t("common.demoData")}</span></div><div className="space-y-6">{groups.map((group) => {const entries = results.filter((result) => result.type === group); if (!entries.length) return null; const title = group === "notice" ? t("search.notices") : group === "examination" ? t("search.examinations") : t("search.resources"); return <section key={group}><div className="mb-3 flex items-center gap-3"><h3 className="font-display text-lg font-bold">{title}</h3><span className="border-2 border-ink bg-sage px-2 py-0.5 text-xs font-bold">{entries.length}</span></div><div className="grid gap-3">{entries.map((entry) => <SearchCard key={entry.id} entry={entry} query={initialQuery} />)}</div></section>;})}</div></section> : null}
  </div>;
}

function SearchCard({entry, query}: {entry: SearchResult; query: string}) {
  const t = useTranslations("common");
  const content = <><span className="block text-xs font-bold uppercase tracking-wide text-teal">{entry.metadata}</span><span className="mt-1 block font-display text-lg font-bold">{renderHighlighted(entry.title, query)}</span><span className="mt-2 block text-sm text-secondary">{renderHighlighted(entry.summary, query)}</span></>;
  const className = "panel focus-ring flex items-start justify-between gap-4 p-4 transition hover:-translate-y-0.5 hover:bg-sage hover:shadow-hard-sm";
  if (entry.href.startsWith("http")) return <a className={className} href={entry.href} target="_blank" rel="noreferrer">{content}<ArrowRight aria-hidden="true" className="mt-2 shrink-0" size={18} /><span className="sr-only">{t("openExternal")}</span></a>;
  return <Link className={className} href={entry.href}>{content}<ArrowRight aria-hidden="true" className="mt-2 shrink-0" size={18} /></Link>;
}

function renderHighlighted(text: string, query: string) {
  return highlightMatch(text, query).map((part, index) => part.toLowerCase() === query.toLowerCase() ? <mark key={`${part}-${index}`} className="bg-coral px-0.5 text-ink">{part}</mark> : <span key={`${part}-${index}`}>{part}</span>);
}
