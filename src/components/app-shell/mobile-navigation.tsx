"use client";

import {CircleHelp, ClipboardCheck, GraduationCap, Home, Languages, Volume2, VolumeX, X} from "lucide-react";
import {useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {useSearchParams} from "next/navigation";
import {Link, usePathname, useRouter} from "@/i18n/navigation";
import {useDemoState} from "@/providers/demo-state-provider";
import type {Locale} from "@/types";

export function MobileNavigation({open, onClose}: {open: boolean; onClose: () => void}) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const {fontScale, setFontScale} = useDemoState();
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, open]);

  if (!open) return null;

  const switchLocale = (nextLocale: Locale) => {
    const query = searchParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {locale: nextLocale});
    onClose();
  };

  const toggleSpeech = () => {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const speech = new SpeechSynthesisUtterance(document.querySelector("main")?.textContent?.slice(0, 4000) ?? "");
    speech.lang = document.documentElement.lang === "ml" ? "ml-IN" : "en-IN";
    speech.onend = () => setSpeaking(false);
    speech.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
    setSpeaking(true);
  };

  const items = [
    {href: "/", label: t("nav.home"), icon: Home},
    {href: "/exams", label: t("nav.exams"), icon: GraduationCap},
    {href: "/results", label: t("nav.results"), icon: ClipboardCheck}
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label={t("mobile.menuTitle")}>
      <button type="button" aria-label={t("common.close")} className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-[min(22rem,88vw)] flex-col overflow-y-auto border-l-2 border-ink bg-ivory p-5 shadow-hard">
        <div className="flex items-center justify-between border-b-2 border-ink pb-4">
          <p className="font-display text-lg font-bold">{t("mobile.menuTitle")}</p>
          <button type="button" autoFocus className="icon-button" aria-label={t("mobile.closeMenu")} onClick={onClose}><X aria-hidden="true" size={20} /></button>
        </div>
        <nav className="mt-6 grid gap-2" aria-label={t("mobile.menuTitle")}>
          {items.map(({href, label, icon: Icon}) => {
            const active = pathname === href;
            return <Link key={href} href={href} onClick={onClose} className={`focus-ring flex min-h-12 items-center gap-3 rounded-md border-2 border-ink px-4 font-semibold ${active ? "bg-sage shadow-hard-sm" : "bg-white hover:bg-muted"}`}><Icon aria-hidden="true" size={19} />{label}</Link>;
          })}
          <button type="button" className="focus-ring mt-2 flex min-h-12 items-center gap-3 rounded-md border-2 border-ink bg-teal px-4 font-semibold text-white shadow-hard-sm" onClick={() => { window.dispatchEvent(new Event("open-ask-pulse")); onClose(); }}>
            <CircleHelp aria-hidden="true" size={19} />{t("nav.help")}
          </button>
        </nav>
        <section className="mt-6 border-t-2 border-ink pt-5" aria-label={t("settings.title")}>
          <label className="flex min-h-11 items-center gap-2 rounded-md border-2 border-ink bg-white px-3 text-sm font-semibold text-ink">
            <Languages aria-hidden="true" size={18} />
            <span className="sr-only">{t("settings.language")}</span>
            <select className="w-full cursor-pointer bg-transparent outline-none" aria-label={t("settings.language")} value={locale} onChange={(event) => switchLocale(event.target.value as Locale)}>
              <option value="en">English</option>
              <option value="ml">മലയാളം</option>
            </select>
          </label>
          <fieldset className="mt-4"><legend className="text-sm font-semibold">{t("settings.textSize")}</legend><div className="mt-2 grid grid-cols-3 gap-2">{([['normal', t("settings.normal")], ['large', t("settings.large")], ['extra', t("settings.extraLarge")]] as const).map(([value, label]) => <button key={value} type="button" className={`focus-ring min-h-10 rounded-md border-2 border-ink px-2 text-xs font-semibold ${fontScale === value ? "bg-sage" : "bg-white hover:bg-muted"}`} onClick={() => setFontScale(value)}>{label}</button>)}</div></fieldset>
          <button type="button" className="soft-button mt-4 w-full" onClick={toggleSpeech}>{speaking ? <VolumeX aria-hidden="true" size={17} /> : <Volume2 aria-hidden="true" size={17} />}{speaking ? t("settings.stopReading") : t("settings.readAloud")}</button>
          <p className="mt-2 text-xs leading-5 text-secondary">{t("settings.readAloudNote")}</p>
        </section>
        <p className="mt-6 border-t-2 border-ink pt-4 text-xs leading-5 text-secondary">{t("home.sourceNote")}</p>
      </aside>
    </div>
  );
}
