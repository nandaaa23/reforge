import type {Metadata} from "next";
import {NextIntlClientProvider} from "next-intl";
import {notFound} from "next/navigation";
import {AppShell} from "@/components/app-shell/app-shell";
import {routing} from "@/i18n/routing";
import {DemoStateProvider} from "@/providers/demo-state-provider";
import "../globals.css";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const isMalayalam = locale === "ml";
  return {
    title: isMalayalam ? "KTU പൾസ് — വിദ്യാർത്ഥി പോർട്ടൽ ഡെമോ" : "KTU Pulse — Student Portal Demo",
    description: isMalayalam
      ? "അക്കാദമിക് വിവരങ്ങൾ കണ്ടെത്തുന്നതിനുള്ള വിദ്യാർത്ഥി കേന്ദ്രീകൃത ഡെമോ പുനർരൂപകൽപ്പന."
      : "A student-centred, demo-only redesign for academic information discovery."
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{children: React.ReactNode; params: Promise<{locale: string}>}>) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();

  const messages = locale === "ml"
    ? (await import("../../../messages/ml.json")).default
    : (await import("../../../messages/en.json")).default;

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <DemoStateProvider>
            <AppShell>{children}</AppShell>
          </DemoStateProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
