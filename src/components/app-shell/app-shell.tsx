"use client";

import {useTranslations} from "next-intl";
import {AskPulse} from "@/components/chat/ask-pulse";
import {AppHeader} from "./app-header";

export function AppShell({children}: {children: React.ReactNode}) {
  const t = useTranslations("footer");

  return (
    <div className="min-h-screen bg-ivory">
      <AppHeader />
      <main id="main-content" className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        {children}
      </main>
      <footer className="border-t-2 border-ink bg-white px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>{t("prototype")}</p>
          <p>{t("verification")}</p>
        </div>
      </footer>
      <AskPulse />
    </div>
  );
}
