"use client";

import {useTranslations} from "next-intl";

export function DemoBadge({long = false}: {long?: boolean}) {
  const t = useTranslations("common");
  return <span className="demo-label">{long ? t("demonstrationData") : t("demoData")}</span>;
}
