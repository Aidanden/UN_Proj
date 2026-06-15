import { Department } from "./department";
import { Enrollment } from "./enrillment";

export type Gender = "MALE" | "FEMALE";

export const GENDERS: Gender[] = ["MALE", "FEMALE"];

export const GENDER_LABELS: Record<Gender, string> = {
  MALE: "ذكر",
  FEMALE: "أنثى",
};

export type StudentStatus = "ACTIVE" | "GRADUATED" | "SUSPENDED" | "WITHDRAWN";

export const STUDENT_STATUSES: StudentStatus[] = [
  "ACTIVE",
  "GRADUATED",
  "SUSPENDED",
  "WITHDRAWN",
];

export const STUDENT_STATUS_LABELS: Record<StudentStatus, string> = {
  ACTIVE: "نشط",
  GRADUATED: "متخرج",
  SUSPENDED: "موقوف",
  WITHDRAWN: "منسحب",
};

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string | null;
  dateOfBirth: Date;
  gender: Gender;
  status: StudentStatus;
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
  address2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  department?: Department;
  enrollments?: Enrollment[];
}

export type CreateStudentInput = {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string | null;
  dateOfBirth: Date;
  gender: Gender;
  status: StudentStatus;
  departmentId: string;
  address2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
};

export type UpdateStudentInput = CreateStudentInput;
