import { api } from "./client";
import type {
  Instructor,
  CreateInstructorInput,
  UpdateInstructorInput,
} from "@/lib/types/instructor";

function parseInstructor(raw: Instructor): Instructor {
  return {
    ...raw,
    dateOfBirth: new Date(raw.dateOfBirth),
    hireDate: new Date(raw.hireDate),
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
  };
}

export async function getInstructors() {
  const instructors = await api<Instructor[]>("/api/instructors");
  return instructors.map(parseInstructor);
}

export async function getInstructorById(id: string) {
  const instructor = await api<Instructor>(`/api/instructors/${id}`);
  return parseInstructor(instructor);
}

export function createInstructor(data: CreateInstructorInput) {
  return api<Instructor>("/api/instructors", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateInstructor(id: string, data: UpdateInstructorInput) {
  return api<Instructor>(`/api/instructors/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteInstructor(id: string) {
  return api<Instructor>(`/api/instructors/${id}`, {
    method: "DELETE",
  });
}
