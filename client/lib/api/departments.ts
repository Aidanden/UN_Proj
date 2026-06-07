import { api } from "./client";
import type {
  CreateDepartmentInput,
  Department,
  UpdateDepartmentInput,
} from "@/lib/types/department";

type CreateResponse = { message: string; department: Department };

export function getDepartments() {
  return api<Department[]>("/api/departments");
}

export function getDepartmentById(id: string) {
  return api<Department>(`/api/departments/${id}`);
}

export function createDepartment(data: CreateDepartmentInput) {
  return api<CreateResponse>("/api/departments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateDepartment(id: string, data: UpdateDepartmentInput) {
  return api<Department>(`/api/departments/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteDepartment(id: string) {
  return api<Department>(`/api/departments/${id}`, {
    method: "DELETE",
  });
}
