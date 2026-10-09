"use client";

import {ClipboardCheck, GraduationCap, Home, Menu} from "lucide-react";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";
import {NotificationCenter} from "@/components/notifications/notification-center";
import {GlobalSearch} from "@/components/search/global-search";
import {LanguageSelector} from "./language-selector";
import {MobileNavigation} from "./mobile-navigation";
import {SettingsPanel} from "./settings-panel";

function PulseLogo() {
  return <Link href="/" className="focus-ring flex items-center gap-2 rounded-md"><span className="flex size-9 flex-col justify-center gap-1 rounded-sm border-2 border-ink bg-teal px-1.5" aria-hidden="true"><i className="h-0.5 w-full bg-ivory" /><i className="h-0.5 w-3/4 bg-ivory" /><i className="h-0.5 w-full bg-ivory" /></span><span className="font-display text-lg font-bold tracking-tight"><span className="text-teal">KTU</span> PULSE</span></Link>;
}

export function AppHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    {href: "/", label: t("home"), icon: Home},
    {href: "/exams", label: t("exams"), icon: GraduationCap},
    {href: "/results", label: t("results"), icon: ClipboardCheck}
  ];

  return <header className="no-print sticky top-0 z-30 border-b-2 border-ink bg-ivory/95 backdrop-blur">
    <div className="mx-auto flex min-h-[74px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
      <PulseLogo />
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
        {navItems.map(({href, label, icon: Icon}) => { const active = pathname === href; return <Link key={href} href={href} className={`focus-ring inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold transition ${active ? "border-2 border-ink bg-sage shadow-hard-sm" : "border-2 border-transparent hover:border-ink hover:bg-white"}`}><Icon aria-hidden="true" size={16} />{label}</Link>; })}
      </nav>
      <div className="flex items-center gap-2"><GlobalSearch /><LanguageSelector /><NotificationCenter /><SettingsPanel /><button type="button" className="icon-button md:hidden" aria-label={t("openMenu")} aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}><Menu aria-hidden="true" size={21} /></button></div>
    </div>
    <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
  </header>;
}
