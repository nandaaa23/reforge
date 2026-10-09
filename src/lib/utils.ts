import {examinations} from "@/data/examinations";
import {notices} from "@/data/notices";
import {resources} from "@/data/resources";
import type {Locale, SearchResult} from "@/types";

const formatterLocales: Record<Locale, string> = {
  en: "en-IN",
  ml: "ml-IN"
};

export function formatDate(value: string | undefined, locale: Locale, style: Intl.DateTimeFormatOptions["dateStyle"] = "medium") {
  if (!value) return "—";

  const parsed = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat(formatterLocales[locale], {dateStyle: style}).format(parsed);
}

export function searchPortal(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const matches = (values: Array<string | undefined>) => values.filter(Boolean).join(" ").toLowerCase().includes(normalized);

  return [
    ...notices
      .filter((notice) => matches([notice.title, notice.summary, notice.category]))
      .map((notice) => ({
        id: notice.id,
        title: notice.title,
        summary: notice.summary,
        type: "notice" as const,
        href: "/",
        metadata: notice.category
      })),
    ...examinations
      .filter((exam) => matches([exam.name, exam.academicYear, exam.type, exam.programme, exam.semester, exam.status]))
      .map((exam) => ({
        id: exam.id,
        title: exam.name,
        summary: `${exam.programme ?? ""} ${exam.semester ?? ""}`.trim(),
        type: "examination" as const,
        href: "/exams",
        metadata: `${exam.academicYear} · ${exam.type}`
      })),
    ...resources
      .filter((resource) => matches([resource.title, resource.summary, resource.category]))
      .map((resource) => ({
        id: resource.id,
        title: resource.title,
        summary: resource.summary,
        type: "resource" as const,
        href: resource.href,
        metadata: resource.category
      }))
  ];
}

export function highlightMatch(text: string, query: string) {
  const trimmed = query.trim();
  if (!trimmed) return [text];

  const parts = text.split(new RegExp(`(${trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts;
}
