import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-14 sm:px-6">
      <section className="panel w-full p-7 shadow-hard sm:p-10">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-display text-3xl font-bold">{t("backToHome")}</h1>
        <p className="mt-3 max-w-xl text-secondary">{t("openExternal")}</p>
        <Link href="/" className="hard-button mt-6">{t("backToHome")}</Link>
      </section>
    </section>
  );
}
