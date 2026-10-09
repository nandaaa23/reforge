"use client";

import {ArrowRight, Search, X} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";
import {searchPortal} from "@/lib/utils";
import type {SearchResult} from "@/types";

const groups: Array<SearchResult["type"]> = ["notice", "examination", "resource"];

export function GlobalSearch() {
  const t = useTranslations();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchPortal(query);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const selectResult = (result: SearchResult) => {
    setOpen(false);
    if (result.href.startsWith("http")) window.location.assign(result.href);
    else router.push(result.href);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!results.length) return;
    if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex((value) => (value + 1) % results.length); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((value) => (value - 1 + results.length) % results.length); }
    if (event.key === "Enter") { event.preventDefault(); selectResult(results[activeIndex]); }
  };

  return (
    <>
      <button type="button" className="icon-button sm:w-auto sm:px-3" aria-label={t("nav.search")} onClick={() => setOpen(true)}>
        <Search aria-hidden="true" size={19} /><span className="hidden text-sm font-semibold sm:inline">{t("nav.search")}</span>
      </button>
      {open ? <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/45 p-4 pt-[10vh]" role="dialog" aria-modal="true" aria-label={t("search.title")}>
        <button type="button" className="absolute inset-0 cursor-default" aria-label={t("common.close")} onClick={() => setOpen(false)} />
        <section className="relative z-10 w-full max-w-2xl rounded-panel border-2 border-ink bg-ivory p-4 shadow-hard sm:p-5">
          <header className="flex items-start justify-between gap-4"><div><p className="eyebrow">{t("common.demoData")}</p><h2 className="mt-1 font-display text-2xl font-bold">{t("search.title")}</h2><p className="mt-1 text-sm text-secondary">{t("search.dialogDescription")}</p></div><button type="button" className="icon-button" aria-label={t("common.close")} onClick={() => setOpen(false)}><X aria-hidden="true" size={20} /></button></header>
          <div className="relative mt-5"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true" size={19} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={onKeyDown} className="input-base pl-10 pr-10" placeholder={t("search.placeholder")} aria-label={t("search.placeholder")} aria-activedescendant={results[activeIndex] ? `search-result-${results[activeIndex].id}` : undefined} />{query ? <button type="button" className="focus-ring absolute right-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md hover:bg-muted" aria-label={t("common.clear")} onClick={() => setQuery("")}><X aria-hidden="true" size={17} /></button> : null}</div>
          <p className="mt-2 text-xs text-secondary">{t("search.hint")}</p>
          <div className="mt-4 max-h-[55vh] overflow-y-auto" role="listbox">
            {!query ? <div className="rounded-md border-2 border-ink bg-white p-5"><h3 className="font-display text-lg font-bold">{t("search.startTitle")}</h3><p className="mt-1 text-sm text-secondary">{t("search.startDescription")}</p></div> : null}
            {query && !results.length ? <div className="rounded-md border-2 border-dashed border-ink bg-white p-5"><h3 className="font-display text-lg font-bold">{t("search.emptyTitle")}</h3><p className="mt-1 text-sm text-secondary">{t("search.emptyDescription")}</p><button type="button" className="soft-button mt-4" onClick={() => setQuery("")}>{t("common.clear")}</button></div> : null}
            {groups.map((group) => { const entries = results.filter((result) => result.type === group); if (!entries.length) return null; const title = group === "notice" ? t("search.notices") : group === "examination" ? t("search.examinations") : t("search.resources"); return <section key={group} className="mb-4"><div className="mb-2 flex items-center justify-between"><h3 className="font-display text-sm font-bold uppercase tracking-wide">{title}</h3><span className="text-xs text-secondary">{entries.length}</span></div><div className="grid gap-2">{entries.map((result) => { const index = results.findIndex((entry) => entry.id === result.id); return <button key={result.id} id={`search-result-${result.id}`} type="button" role="option" aria-selected={activeIndex === index} className={`focus-ring flex w-full items-start justify-between gap-4 rounded-md border-2 border-ink bg-white p-3 text-left transition hover:bg-sage ${activeIndex === index ? "bg-sage" : ""}`} onClick={() => selectResult(result)}><span><span className="block text-xs font-bold uppercase tracking-wide text-teal">{result.metadata}</span><span className="mt-1 block font-semibold">{result.title}</span><span className="mt-1 block text-sm text-secondary">{result.summary}</span></span><ArrowRight aria-hidden="true" className="mt-2 shrink-0" size={18} /></button>; })}</div></section>; })}
          </div>
          {query ? <p className="mt-3 text-sm font-semibold">{t("search.results", {count: results.length})}</p> : null}
        </section>
      </div> : null}
    </>
  );
}
