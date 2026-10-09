export type Locale = "en" | "ml";

export type NoticeCategory = "examination" | "results" | "deadline" | "general";

export type Notice = {
  id: string;
  title: string;
  summary: string;
  category: NoticeCategory;
  publishedAt?: string;
  deadline?: string;
  sourceUrl?: string;
  requiresAction: boolean;
  isSample: true;
};

export type ExamStatus = "scheduled" | "tentative" | "completed" | "not-configured";

export type Examination = {
  id: string;
  name: string;
  academicYear: string;
  type: "Regular" | "Supplementary" | "Special";
  programme?: string;
  semester?: string;
  date?: string;
  status: ExamStatus;
  sourceUrl?: string;
  isSample: true;
};

export type Grade = "S" | "A+" | "A" | "B+" | "B" | "C" | "P" | "F";

export type SubjectGrade = {
  code: string;
  name: string;
  credits: number;
  grade: Grade;
};

export type SampleResult = {
  id: string;
  studentName: string;
  studentId: string;
  programme: string;
  semester: string;
  academicYear: string;
  subjects: SubjectGrade[];
  resultStatus: "Passed" | "Pending";
  sgpa?: number;
  isSample: true;
};

export type NotificationCategory = "examinations" | "results" | "deadlines" | "announcements";

export type PortalNotification = {
  id: string;
  title: string;
  detail: string;
  category: NotificationCategory;
  publishedAt: string;
  href: string;
  isRead: boolean;
  isSample: true;
};

export type AcademicResource = {
  id: string;
  title: string;
  summary: string;
  category: "resource" | "help";
  href: string;
  isSample: true;
};

export type SearchResult = {
  id: string;
  title: string;
  summary: string;
  type: "notice" | "examination" | "resource";
  href: string;
  metadata: string;
};

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  links?: Array<{label: string; href: string}>;
};
