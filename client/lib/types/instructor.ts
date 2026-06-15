export type Gender = "MALE" | "FEMALE";

export const GENDERS: Gender[] = ["MALE", "FEMALE"];

export const GENDER_LABELS: Record<Gender, string> = {
  MALE: "ذكر",
  FEMALE: "أنثى",
};

export interface Instructor {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string | null;
  dateOfBirth: Date;
  gender: Gender;
  departmentId: string;
  hireDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateInstructorInput = {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string | null;
  dateOfBirth: Date;
  gender: Gender;
  departmentId: string;
  hireDate: Date;
};

export type UpdateInstructorInput = CreateInstructorInput;
