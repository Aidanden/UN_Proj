export interface Department {
  id: string;
  name: string;
  code: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { students: number };
}

export type CreateDepartmentInput = {
  name: string;
  code: string;
  description?: string;
};

export type UpdateDepartmentInput = CreateDepartmentInput;
