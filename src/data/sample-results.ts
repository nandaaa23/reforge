import type {SampleResult} from "@/types";

export const sampleResults: SampleResult[] = [
  {
    id: "demo-student-s5",
    studentName: "Demo Student",
    studentId: "DEMO-2026-051",
    programme: "B.Tech Computer Science & Engineering",
    semester: "S5",
    academicYear: "2026–27",
    subjects: [
      {code: "MAT301", name: "Discrete Mathematical Structures", credits: 4, grade: "A"},
      {code: "CST301", name: "Formal Languages and Automata Theory", credits: 4, grade: "A+"},
      {code: "CST303", name: "Computer Networks", credits: 3, grade: "B+"},
      {code: "CST305", name: "Microprocessors and Microcontrollers", credits: 3, grade: "A"},
      {code: "HUT300", name: "Professional Ethics", credits: 2, grade: "S"}
    ],
    resultStatus: "Passed",
    sgpa: 8.31,
    isSample: true
  },
  {
    id: "demo-student-s6",
    studentName: "Demo Student",
    studentId: "DEMO-2026-061",
    programme: "B.Tech Computer Science & Engineering",
    semester: "S6",
    academicYear: "2026–27",
    subjects: [
      {code: "CST302", name: "Compiler Design", credits: 4, grade: "A+"},
      {code: "CST304", name: "Operating Systems", credits: 4, grade: "A"},
      {code: "CST306", name: "Computer Graphics", credits: 3, grade: "A+"},
      {code: "CST308", name: "Data Mining", credits: 3, grade: "A"},
      {code: "MCN301", name: "Constitution of India", credits: 3, grade: "A+"}
    ],
    resultStatus: "Passed",
    sgpa: 8.59,
    isSample: true
  }
];
