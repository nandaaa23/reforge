"use client";

import {Bell, Check, SlidersHorizontal} from "lucide-react";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {formatDate} from "@/lib/utils";
import {useDemoState} from "@/providers/demo-state-provider";
import type {Locale, NotificationCategory} from "@/types";
import {useLocale} from "next-intl";

const preferenceCategories: NotificationCategory[] = ["examinations", "results", "deadlines", "announcements"];

export function NotificationCenter() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const {notifications, unreadCount, preferences, markRead, markAllRead, togglePreference} = useDemoState();
  const [open, setOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const visible = notifications.filter((notification) => preferences[notification.category]);

  return (
    <div className="relative">
      <button type="button" className="icon-button relative" aria-label={t("notifications.open")} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <Bell aria-hidden="true" size={19} />
        {unreadCount > 0 ? <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full border-2 border-ink bg-coral text-[10px] font-bold">{unreadCount}</span> : null}
      </button>
      {open ? (
        <section className="absolute right-0 top-14 z-40 w-[min(25rem,calc(100vw-2rem))] rounded-panel border-2 border-ink bg-white p-4 shadow-hard" aria-label={t("notifications.title")}>
          <header className="flex items-start justify-between gap-4 border-b-2 border-ink pb-3">
            <div>
              <h2 className="font-display text-lg font-bold">{t("notifications.title")}</h2>
              <p className="text-xs text-secondary">{t("notifications.unread", {count: unreadCount})}</p>
            </div>
            <button type="button" className="focus-ring text-xs font-bold text-teal underline decoration-2 underline-offset-4 disabled:no-underline" disabled={!unreadCount} onClick={markAllRead}>{t("notifications.markAll")}</button>
          </header>
          <div className="max-h-72 divide-y-2 divide-ink overflow-y-auto">
            {visible.length ? visible.map((notification) => (
              <article key={notification.id} className={`py-3 ${notification.isRead ? "opacity-75" : ""}`}>
                <div className="flex gap-3">
                  <div className={`mt-1.5 size-2.5 shrink-0 rounded-full border border-ink ${notification.isRead ? "bg-muted" : "bg-coral"}`} aria-label={notification.isRead ? "" : t("notifications.unread", {count: 1})} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2"><span className="demo-label">{t("common.demoData")}</span><span className="text-[11px] font-bold text-secondary">{t(`categories.${notification.category}`)}</span></div>
                    <Link href={notification.href} onClick={() => { markRead(notification.id); setOpen(false); }} className="focus-ring mt-2 block font-semibold underline decoration-2 underline-offset-4 hover:text-teal">{notification.title}</Link>
                    <p className="mt-1 text-sm text-secondary">{notification.detail}</p>
                    <div className="mt-2 flex items-center justify-between gap-3 text-xs text-secondary"><span>{formatDate(notification.publishedAt, locale)}</span>{!notification.isRead ? <button type="button" className="focus-ring inline-flex items-center gap-1 font-semibold text-teal underline decoration-2 underline-offset-2" onClick={() => markRead(notification.id)}><Check aria-hidden="true" size={14} />{t("notifications.markRead")}</button> : null}</div>
                  </div>
                </div>
              </article>
            )) : <p className="py-6 text-center text-sm text-secondary">{t("notifications.empty")}</p>}
          </div>
          <div className="mt-3 border-t-2 border-ink pt-3">
            <button type="button" className="focus-ring flex items-center gap-2 text-sm font-bold text-teal underline decoration-2 underline-offset-4" onClick={() => setShowPreferences((value) => !value)}><SlidersHorizontal aria-hidden="true" size={16} />{t("notifications.preferences")}</button>
            {showPreferences ? <div className="mt-3 rounded-md border-2 border-ink bg-muted p-3"><p className="text-xs text-secondary">{t("notifications.preferencesDescription")}</p><div className="mt-3 grid gap-2">{preferenceCategories.map((category) => <label key={category} className="flex min-h-10 items-center justify-between gap-3 rounded-md bg-white px-3 text-sm font-semibold"><span>{t(`categories.${category}`)}</span><input className="size-5 accent-teal" type="checkbox" checked={preferences[category]} onChange={() => togglePreference(category)} /></label>)}</div><p className="mt-3 text-xs text-secondary">{t("notifications.pushNote")}</p></div> : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
