import { api } from "./client";
import type {
  Enrollment,
  CreateEnrollmentInput,
  UpdateEnrollmentInput,
} from "@/lib/types/enrillment";

function parseEnrollment(raw: Enrollment): Enrollment {
  return {
    ...raw,
    enrollmentDate: new Date(raw.enrollmentDate),
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
  };
}

export async function getEnrollments() {
  const enrollments = await api<Enrollment[]>("/api/enrollments");
  return enrollments.map(parseEnrollment);
}

export async function getEnrollmentById(id: string) {
  const enrollment = await api<Enrollment>(`/api/enrollments/${id}`);
  return parseEnrollment(enrollment);
}

export function createEnrollment(data: CreateEnrollmentInput) {
  return api<Enrollment>("/api/enrollments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateEnrollment(id: string, data: UpdateEnrollmentInput) {
  return api<Enrollment>(`/api/enrollments/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteEnrollment(id: string) {
  return api<Enrollment>(`/api/enrollments/${id}`, {
    method: "DELETE",
  });
}
