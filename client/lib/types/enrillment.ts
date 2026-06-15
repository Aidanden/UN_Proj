import { Student } from "./student";
import { Course } from "./course";

export type EnrollmentStatus = "ENROLLED" | "COMPLETED" | "DROPPED" | "FAILED";

export const ENROLLMENT_STATUSES: EnrollmentStatus[] = [
  "ENROLLED",
  "COMPLETED",
  "DROPPED",
  "FAILED",
];

export const ENROLLMENT_STATUS_LABELS: Record<EnrollmentStatus, string> = {
  ENROLLED: "مسجل",
  COMPLETED: "منتهي",
  DROPPED: "محذوف",
  FAILED: "فشل",
};

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: Date;
  grade: string | null;
  gradePoint: number | null;
  attendance: number | null;
  status: EnrollmentStatus;
  createdAt: Date;
  updatedAt: Date;
  student?: Student;
  course?: Course;
}

export type CreateEnrollmentInput = {
  studentId: string;
  courseId: string;
  enrollmentDate: Date;
  grade: string | null;
  gradePoint: number | null;
  attendance: number | null;
  status: EnrollmentStatus;
};

export type UpdateEnrollmentInput = CreateEnrollmentInput;
