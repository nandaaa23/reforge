"use client";

import {Bot, Eraser, ExternalLink, MessageCircle, Send, X} from "lucide-react";
import {useEffect, useMemo, useRef, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";
import {getDemoReply} from "@/lib/chat";
import type {ChatMessage, Locale} from "@/types";

export function AskPulse() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [failedQuestion, setFailedQuestion] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const welcome = useMemo<ChatMessage>(() => ({id: "welcome", role: "assistant", content: t("chat.welcome")}), [t]);
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);

  useEffect(() => {
    setMessages((current) => current.length === 1 && current[0]?.id === "welcome" ? [welcome] : current);
  }, [welcome]);

  useEffect(() => {
    const openChat = (event: Event) => {
      setOpen(true);
      const custom = event as CustomEvent<string | undefined>;
      if (custom.detail) setInput(custom.detail);
    };
    window.addEventListener("open-ask-pulse", openChat);
    return () => window.removeEventListener("open-ask-pulse", openChat);
  }, []);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({behavior: "smooth", block: "end"});
  }, [messages, open, pending]);

  const pageContext = pathname.includes("/results") ? "results" : pathname.includes("/exams") ? "exams" : "home";

  const submit = (question = input) => {
    const clean = question.trim();
    if (!clean || pending) return;
    setFailedQuestion(null);
    setMessages((current) => [...current, {id: `user-${Date.now()}`, role: "user", content: clean}]);
    setInput("");
    setPending(true);
    window.setTimeout(() => {
      try {
        if (clean.toLowerCase() === "test error") throw new Error("Demo error state");
        const reply = getDemoReply(clean, locale, pageContext);
        setMessages((current) => [...current, {id: `assistant-${Date.now()}`, role: "assistant", ...reply}]);
      } catch {
        setFailedQuestion(clean);
      } finally {
        setPending(false);
      }
    }, 500);
  };

  const clearChat = () => {
    setMessages([welcome]);
    setInput("");
    setFailedQuestion(null);
  };

  const suggested = [
    t("chat.questionResult"),
    t("chat.questionStatus"),
    t("chat.questionTimetable"),
    t("chat.questionNotice"),
    t("chat.questionMalayalam")
  ];

  return <div className="ask-pulse-root fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
    {open ? <section id="ask-pulse-panel" className="mb-3 flex h-[min(38rem,calc(100vh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-panel border-2 border-ink bg-ivory shadow-hard" aria-label={t("chat.title")}>
      <header className="flex items-start justify-between gap-4 border-b-2 border-ink bg-teal p-4 text-white"><div className="flex gap-3"><span className="flex size-9 items-center justify-center rounded-sm border-2 border-ink bg-sage text-ink"><Bot aria-hidden="true" size={20} /></span><div><h2 className="font-display text-lg font-bold">{t("chat.title")}</h2><p className="text-xs text-white/80">{t("chat.subtitle")}</p></div></div><div className="flex gap-2"><button type="button" className="focus-ring inline-flex size-8 items-center justify-center rounded-sm border border-white/70 hover:bg-white/15" aria-label={t("chat.clearChat")} onClick={clearChat}><Eraser aria-hidden="true" size={16} /></button><button type="button" className="focus-ring inline-flex size-8 items-center justify-center rounded-sm border border-white/70 hover:bg-white/15" aria-label={t("common.close")} onClick={() => setOpen(false)}><X aria-hidden="true" size={18} /></button></div></header>
      <div className="flex-1 overflow-y-auto p-4"><div className="space-y-3">{messages.map((message) => <article key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[88%] rounded-md border-2 border-ink px-3 py-2 text-sm ${message.role === "user" ? "bg-sage" : "bg-white"}`}><p>{message.content}</p>{message.links?.map((link) => <Link href={link.href} key={link.href} className="focus-ring mt-2 inline-flex items-center gap-1 text-sm font-bold text-teal underline decoration-2 underline-offset-4" onClick={() => setOpen(false)}>{link.label}<ExternalLink aria-hidden="true" size={14} /></Link>)}</div></article>)}{pending ? <div className="flex justify-start"><div className="rounded-md border-2 border-ink bg-white px-3 py-2 text-sm text-secondary"><span className="mr-2 inline-block size-2 animate-pulse rounded-full bg-coral" />{t("chat.typing")}</div></div> : null}{failedQuestion ? <div className="rounded-md border-2 border-danger bg-white p-3"><p className="text-sm text-danger">{t("chat.error")}</p><button type="button" className="focus-ring mt-2 text-sm font-bold text-teal underline decoration-2 underline-offset-4" onClick={() => { const retry = failedQuestion; setFailedQuestion(null); submit(retry); }}>{t("chat.retry")}</button></div> : null}</div><div ref={bottomRef} /></div>
      <div className="border-t-2 border-ink bg-white p-3"><div className="flex gap-2 overflow-x-auto pb-2">{suggested.map((question) => <button type="button" key={question} onClick={() => submit(question)} className="focus-ring shrink-0 rounded-md border border-ink bg-muted px-2 py-1 text-left text-xs font-semibold hover:bg-sage">{question}</button>)}</div><form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); submit(); }}><label className="sr-only" htmlFor="ask-pulse-input">{t("chat.inputPlaceholder")}</label><input id="ask-pulse-input" value={input} onChange={(event) => setInput(event.target.value)} className="input-base min-w-0 flex-1" placeholder={t("chat.inputPlaceholder")} /><button type="submit" className="hard-button size-11 shrink-0 px-0" aria-label={t("chat.send")} disabled={!input.trim() || pending}><Send aria-hidden="true" size={17} /></button></form></div>
    </section> : null}
    <button type="button" className="hard-button" aria-expanded={open} aria-controls="ask-pulse-panel" onClick={() => setOpen((value) => !value)}><MessageCircle aria-hidden="true" size={19} /><span>{t("chat.trigger")}</span></button>
  </div>;
}
