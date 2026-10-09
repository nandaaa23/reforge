import type {PortalNotification} from "@/types";

export const initialNotifications: PortalNotification[] = [
  {
    id: "notification-registration",
    title: "Demo deadline reminder",
    detail: "A sample registration review item is in your Pulse Priority list.",
    category: "deadlines",
    publishedAt: "2026-10-06",
    href: "/exams",
    isRead: false,
    isSample: true
  },
  {
    id: "notification-timetable",
    title: "Demo examination update",
    detail: "Sample timetable information is now available to review.",
    category: "examinations",
    publishedAt: "2026-10-03",
    href: "/exams",
    isRead: false,
    isSample: true
  },
  {
    id: "notification-result",
    title: "Try the result demonstration",
    detail: "Choose a semester to see a fictional grade card.",
    category: "results",
    publishedAt: "2026-09-30",
    href: "/results",
    isRead: true,
    isSample: true
  },
  {
    id: "notification-resource",
    title: "Demo resource directory update",
    detail: "Sample academic resources are searchable from every page.",
    category: "announcements",
    publishedAt: "2026-09-28",
    href: "/search?q=resource",
    isRead: true,
    isSample: true
  }
];
