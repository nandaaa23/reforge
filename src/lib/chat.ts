import type {ChatMessage, Locale} from "@/types";

type DemoReply = Pick<ChatMessage, "content" | "links">;

const english = {
  results: "To explore a result in this public demo, open Results, choose a sample semester, then select “View sample result.” Real results must be retrieved through an authorized university service; this page never asks for credentials.",
  timetable: "Open Examinations and use the filters to find a sample record. Its source action leads to the verified public KTU website, where live timetable information should be checked.",
  status: "A status tells you how confidently a record can be acted on. In this prototype, “Tentative sample” and “Scheduled sample” are fictional labels, so they are not official examination instructions.",
  notice: "In simple terms: read the action label first, check whether a deadline is actually shown, then open the source before you act. Every notice here is marked as demonstration data.",
  language: "Use the language menu in the header to switch the interface between English and Malayalam. Your current page and search context are preserved where the browser allows it.",
  fallback: "I can guide you through the sample Results and Examinations pages, explain the demo notice layout, or help you change the interface language. I cannot verify live KTU dates, rules, or individual student records."
};

const malayalam = {
  results: "ഈ പൊതു ഡെമോയിൽ ഫലം കാണാൻ ഫലങ്ങൾ പേജ് തുറക്കുക, ഒരു മാതൃകാ സെമസ്റ്റർ തിരഞ്ഞെടുക്കുക, തുടർന്ന് “മാതൃകാ ഫലം കാണുക” തിരഞ്ഞെടുക്കുക. യഥാർത്ഥ ഫലങ്ങൾക്ക് അംഗീകൃത സർവകലാശാലാ സേവനം ആവശ്യമാണ്; ഈ പേജ് ക്രെഡൻഷ്യലുകൾ ചോദിക്കില്ല.",
  timetable: "പരീക്ഷകൾ പേജ് തുറന്ന് മാതൃകാ രേഖ കണ്ടെത്താൻ ഫിൽട്ടറുകൾ ഉപയോഗിക്കുക. അതിലെ ഉറവിട പ്രവർത്തനം സ്ഥിരീകരിച്ച പൊതു KTU സൈറ്റിലേക്ക് നയിക്കും; തത്സമയ ടൈംടേബിൾ അവിടെ പരിശോധിക്കണം.",
  status: "ഒരു രേഖയിൽ എത്ര ആത്മവിശ്വാസത്തോടെ പ്രവർത്തിക്കാമെന്ന് നില സൂചിപ്പിക്കുന്നു. ഈ പ്രോട്ടോടൈപ്പിലെ “താൽക്കാലിക മാതൃക”, “നിശ്ചയിച്ച മാതൃക” എന്നിവ സാങ്കൽപ്പിക ലേബലുകളാണ്; ഔദ്യോഗിക പരീക്ഷാ നിർദ്ദേശങ്ങളല്ല.",
  notice: "ലളിതമായി: ആദ്യം നടപടി ലേബൽ വായിക്കുക, യഥാർത്ഥത്തിൽ അവസാന തീയതി കാണിക്കുന്നുണ്ടോ എന്ന് പരിശോധിക്കുക, തുടർന്ന് നടപടിയെടുക്കുന്നതിന് മുമ്പ് ഉറവിടം തുറക്കുക. ഇവിടെ എല്ലാ അറിയിപ്പുകളും പ്രദർശന ഡാറ്റയാണ്.",
  language: "ഇന്റർഫേസ് ഇംഗ്ലീഷിനും മലയാളത്തിനും ഇടയിൽ മാറ്റാൻ ഹെഡറിലെ ഭാഷാ മെനു ഉപയോഗിക്കുക. ബ്രൗസർ അനുവദിക്കുന്നിടത്ത് ഇപ്പോഴത്തെ പേജും തിരയൽ സന്ദർഭവും നിലനിർത്തും.",
  fallback: "മാതൃകാ ഫലങ്ങൾ, പരീക്ഷകൾ, അറിയിപ്പ് ലേഔട്ട്, ഭാഷ മാറ്റൽ എന്നിവയിൽ ഞാൻ സഹായിക്കും. തത്സമയ KTU തീയതികളോ നിയമങ്ങളോ വ്യക്തിഗത വിദ്യാർത്ഥി രേഖകളോ എനിക്ക് സ്ഥിരീകരിക്കാനാവില്ല."
};

export function getDemoReply(question: string, locale: Locale, pageContext = "home"): DemoReply {
  const text = question.toLowerCase();
  const copy = locale === "ml" ? malayalam : english;
  const resultIntent = /(result|grade|sgpa|semester|ഫല|ഗ്രേഡ്|സെമസ്റ്റർ)/i.test(text);
  const timetableIntent = /(timetable|time table|schedule|hall ticket|ടൈംടേബിൾ|ടിക്കറ്റ്)/i.test(text);
  const statusIntent = /(status|tentative|scheduled|നില|താൽക്കാലിക|നിശ്ചയിച്ച)/i.test(text);
  const noticeIntent = /(notice|announcement|explain|അറിയിപ്പ്|വിശദീകരി)/i.test(text);
  const languageIntent = /(language|malayalam|english|ഭാഷ|മലയാളം)/i.test(text);

  if (resultIntent || pageContext === "results" && /(how|find|എങ്ങനെ)/i.test(text)) {
    return {content: copy.results, links: [{label: locale === "ml" ? "ഫലങ്ങൾ തുറക്കുക" : "Open Results", href: "/results"}]};
  }
  if (timetableIntent) {
    return {content: copy.timetable, links: [{label: locale === "ml" ? "പരീക്ഷകൾ തുറക്കുക" : "Open Examinations", href: "/exams"}]};
  }
  if (statusIntent) {
    return {content: copy.status, links: [{label: locale === "ml" ? "മാതൃകാ പരീക്ഷകൾ കാണുക" : "View sample examinations", href: "/exams"}]};
  }
  if (noticeIntent) {
    return {content: copy.notice, links: [{label: locale === "ml" ? "ഹോം തുറക്കുക" : "Open Home", href: "/"}]};
  }
  if (languageIntent) {
    return {content: copy.language};
  }
  return {content: copy.fallback, links: [{label: locale === "ml" ? "പൾസ് മുൻഗണന കാണുക" : "View Pulse Priority", href: "/"}]};
}
