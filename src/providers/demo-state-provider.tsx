"use client";

import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {initialNotifications} from "@/data/notifications";
import type {NotificationCategory, PortalNotification} from "@/types";

type FontScale = "normal" | "large" | "extra";
type Preferences = Record<NotificationCategory, boolean>;

type DemoState = {
  notifications: PortalNotification[];
  unreadCount: number;
  preferences: Preferences;
  fontScale: FontScale;
  markRead: (id: string) => void;
  markAllRead: () => void;
  togglePreference: (category: NotificationCategory) => void;
  setFontScale: (scale: FontScale) => void;
};

const DemoStateContext = createContext<DemoState | null>(null);

const defaultPreferences: Preferences = {
  examinations: true,
  results: true,
  deadlines: true,
  announcements: true
};

export function DemoStateProvider({children}: {children: React.ReactNode}) {
  const [notifications, setNotifications] = useState<PortalNotification[]>(initialNotifications);
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [fontScale, setFontScaleState] = useState<FontScale>("normal");

  useEffect(() => {
    const savedScale = window.localStorage.getItem("ktu-pulse-text-size") as FontScale | null;
    const savedPreferences = window.localStorage.getItem("ktu-pulse-notification-preferences");
    if (savedScale === "large" || savedScale === "extra" || savedScale === "normal") {
      setFontScaleState(savedScale);
    }
    if (savedPreferences) {
      try {
        setPreferences({...defaultPreferences, ...JSON.parse(savedPreferences)});
      } catch {
        setPreferences(defaultPreferences);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.textScale = fontScale;
    window.localStorage.setItem("ktu-pulse-text-size", fontScale);
  }, [fontScale]);

  const value = useMemo<DemoState>(() => ({
    notifications,
    unreadCount: notifications.filter((notification) => !notification.isRead).length,
    preferences,
    fontScale,
    markRead: (id) => setNotifications((current) => current.map((item) => item.id === id ? {...item, isRead: true} : item)),
    markAllRead: () => setNotifications((current) => current.map((item) => ({...item, isRead: true}))),
    togglePreference: (category) => setPreferences((current) => {
      const next = {...current, [category]: !current[category]};
      window.localStorage.setItem("ktu-pulse-notification-preferences", JSON.stringify(next));
      return next;
    }),
    setFontScale: setFontScaleState
  }), [fontScale, notifications, preferences]);

  return <DemoStateContext.Provider value={value}>{children}</DemoStateContext.Provider>;
}

export function useDemoState() {
  const context = useContext(DemoStateContext);
  if (!context) throw new Error("useDemoState must be used inside DemoStateProvider");
  return context;
}
