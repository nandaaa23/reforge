"use client";

import {ChevronDown, Settings2, Volume2, VolumeX} from "lucide-react";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {useDemoState} from "@/providers/demo-state-provider";

export function SettingsPanel() {
  const t = useTranslations("settings");
  const {fontScale, setFontScale} = useDemoState();
  const [open, setOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);

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

  return (
    <div className="relative hidden md:block">
      <button type="button" className="icon-button" aria-expanded={open} aria-controls="accessibility-settings" aria-label={t("open")} onClick={() => setOpen((value) => !value)}>
        <Settings2 aria-hidden="true" size={19} />
      </button>
      {open ? (
        <section id="accessibility-settings" className="absolute right-0 top-14 z-40 w-80 rounded-panel border-2 border-ink bg-white p-4 shadow-hard" aria-label={t("title")}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-bold">{t("title")}</h2>
              <p className="mt-1 text-xs text-secondary">{t("readAloudNote")}</p>
            </div>
            <ChevronDown aria-hidden="true" size={18} className="mt-1" />
          </div>
          <fieldset className="mt-4">
            <legend className="text-sm font-semibold">{t("textSize")}</legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {([
                ["normal", t("normal")],
                ["large", t("large")],
                ["extra", t("extraLarge")]
              ] as const).map(([value, label]) => (
                <button key={value} type="button" className={`focus-ring min-h-10 rounded-md border-2 border-ink px-2 text-xs font-semibold ${fontScale === value ? "bg-sage" : "bg-white hover:bg-muted"}`} onClick={() => setFontScale(value)}>
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
          <button type="button" className="soft-button mt-4 w-full" onClick={toggleSpeech}>
            {speaking ? <VolumeX aria-hidden="true" size={17} /> : <Volume2 aria-hidden="true" size={17} />}
            {speaking ? t("stopReading") : t("readAloud")}
          </button>
        </section>
      ) : null}
    </div>
  );
}
