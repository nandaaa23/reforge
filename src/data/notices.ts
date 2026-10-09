import type {Notice} from "@/types";

export const notices: Notice[] = [
  {
    id: "demo-registration-review",
    title: "Demo record: Semester examination registration review",
    summary: "A demonstration reminder showing how an action-required notice would appear. Confirm details only through an official university source.",
    category: "deadline",
    publishedAt: "2026-10-06",
    deadline: "2026-10-15",
    sourceUrl: "https://ktu.edu.in/",
    requiresAction: true,
    isSample: true
  },
  {
    id: "demo-hall-ticket",
    title: "Demo record: Hall ticket availability reminder",
    summary: "This sample explains that hall ticket collection guidance should be read in the linked official notice before taking action.",
    category: "examination",
    publishedAt: "2026-10-04",
    sourceUrl: "https://ktu.edu.in/",
    requiresAction: true,
    isSample: true
  },
  {
    id: "demo-timetable-window",
    title: "Demo record: B.Tech S5 timetable information window",
    summary: "A sample timetable update. Dates and examination instructions in this prototype are not official information.",
    category: "examination",
    publishedAt: "2026-10-03",
    sourceUrl: "https://ktu.edu.in/",
    requiresAction: false,
    isSample: true
  },
  {
    id: "demo-revaluation-guidance",
    title: "Demo record: Revaluation guidance",
    summary: "A sample results-category notice that directs students to the Results page and an official source for verified instructions.",
    category: "results",
    publishedAt: "2026-09-30",
    sourceUrl: "https://ktu.edu.in/",
    requiresAction: false,
    isSample: true
  },
  {
    id: "demo-resource-directory",
    title: "Demo record: Academic resource directory update",
    summary: "A general sample announcement for resource links and university information.",
    category: "general",
    publishedAt: "2026-09-28",
    sourceUrl: "https://ktu.edu.in/",
    requiresAction: false,
    isSample: true
  }
];
