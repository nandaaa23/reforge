import type {Examination} from "@/types";

export const examinations: Examination[] = [
  {
    id: "demo-btech-s5-regular",
    name: "Demo B.Tech S5 Regular Examination",
    academicYear: "2026–27",
    type: "Regular",
    programme: "B.Tech",
    semester: "S5",
    date: "2026-11-04",
    status: "tentative",
    sourceUrl: "https://ktu.edu.in/",
    isSample: true
  },
  {
    id: "demo-btech-s3-regular",
    name: "Demo B.Tech S3 Regular Examination",
    academicYear: "2026–27",
    type: "Regular",
    programme: "B.Tech",
    semester: "S3",
    date: "2026-11-18",
    status: "scheduled",
    sourceUrl: "https://ktu.edu.in/",
    isSample: true
  },
  {
    id: "demo-mca-s1-regular",
    name: "Demo MCA S1 Regular Examination",
    academicYear: "2026–27",
    type: "Regular",
    programme: "MCA",
    semester: "S1",
    date: "2026-12-02",
    status: "tentative",
    sourceUrl: "https://ktu.edu.in/",
    isSample: true
  },
  {
    id: "demo-btech-s6-supplementary",
    name: "Demo B.Tech S6 Supplementary Examination",
    academicYear: "2025–26",
    type: "Supplementary",
    programme: "B.Tech",
    semester: "S6",
    status: "not-configured",
    sourceUrl: "https://ktu.edu.in/",
    isSample: true
  },
  {
    id: "demo-mba-s2-regular",
    name: "Demo MBA S2 Regular Examination",
    academicYear: "2025–26",
    type: "Regular",
    programme: "MBA",
    semester: "S2",
    date: "2026-10-28",
    status: "scheduled",
    sourceUrl: "https://ktu.edu.in/",
    isSample: true
  },
  {
    id: "demo-btech-s4-special",
    name: "Demo B.Tech S4 Special Examination",
    academicYear: "2025–26",
    type: "Special",
    programme: "B.Tech",
    semester: "S4",
    status: "completed",
    sourceUrl: "https://ktu.edu.in/",
    isSample: true
  }
];
