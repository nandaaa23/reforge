"use client";

import {Languages} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {useSearchParams} from "next/navigation";
import {usePathname, useRouter} from "@/i18n/navigation";
import type {Locale} from "@/types";

export function LanguageSelector() {
  const t = useTranslations("settings");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const switchLocale = (nextLocale: Locale) => {
    const query = searchParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {locale: nextLocale});
  };

  return (
    <label className="focus-within:ring-2 focus-within:ring-teal focus-within:ring-offset-2 focus-within:ring-offset-ivory hidden min-h-11 items-center gap-2 rounded-md border-2 border-ink bg-white px-3 text-sm font-semibold text-ink md:flex">
      <Languages aria-hidden="true" size={18} />
      <span className="sr-only">{t("language")}</span>
      <select
        aria-label={t("language")}
        className="cursor-pointer bg-transparent outline-none"
        value={locale}
        onChange={(event) => switchLocale(event.target.value as Locale)}
      >
        <option value="en">English</option>
        <option value="ml">മലയാളം</option>
      </select>
    </label>
  );
}
