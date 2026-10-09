import type {AcademicResource} from "@/types";

export const resources: AcademicResource[] = [
  {
    id: "resource-exams",
    title: "Examination information guide",
    summary: "Use this demo guide to explore examination filters and find a linked official source.",
    category: "resource",
    href: "/exams",
    isSample: true
  },
  {
    id: "resource-results",
    title: "Result lookup guide",
    summary: "See how semester result lookup works with fictional demonstration data.",
    category: "help",
    href: "/results",
    isSample: true
  },
  {
    id: "resource-official",
    title: "KTU public website",
    summary: "The verified public KTU site is the source to consult for live notices and services.",
    category: "resource",
    href: "https://ktu.edu.in/",
    isSample: true
  }
];
