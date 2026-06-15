import { api } from "./client";
import type { Student, CreateStudentInput, UpdateStudentInput } from "@/lib/types/student";

function parseStudent(raw: Student): Student {
  return {
    ...raw,
    dateOfBirth: new Date(raw.dateOfBirth),
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
  };
}

export async function getStudents() {
  const students = await api<Student[]>("/api/students");
  return students.map(parseStudent);
}

export async function getStudentById(id: string) {
  const student = await api<Student>(`/api/students/${id}`);
  return parseStudent(student);
}

export function createStudent(data: CreateStudentInput) {
  return api<Student>("/api/students", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateStudent(id: string, data: UpdateStudentInput) {
  return api<Student>(`/api/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteStudent(id: string) {
  return api<Student>(`/api/students/${id}`, {
    method: "DELETE",
  });
}
