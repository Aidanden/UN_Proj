export interface Department {
  id: string;
  name: string;
  code: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  students?: { id: string }[];
}

export type CreateDepartmentInput = {
  name: string;
  code: string;
  description?: string;
};

export type UpdateDepartmentInput = CreateDepartmentInput;
