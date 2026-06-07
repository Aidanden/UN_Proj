"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  getDepartments,
  updateDepartment,
} from "@/lib/api/departments";
import type {
  CreateDepartmentInput,
  UpdateDepartmentInput,
} from "@/lib/types/department";
import { queryKeys } from "./query-keys";

export function useDepartments() {
  return useQuery({
    queryKey: queryKeys.departments.all,
    queryFn: getDepartments,
  });
}

export function useDepartment(id: string) {
  return useQuery({
    queryKey: queryKeys.departments.detail(id),
    queryFn: () => getDepartmentById(id),
    enabled: !!id,
  });
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDepartmentInput) => createDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.departments.all });
    },
  });
}

export function useUpdateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateDepartmentInput;
    }) => updateDepartment(id, data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.departments.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.departments.detail(id),
      });
    },
  });
}

export function useDeleteDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.departments.all });
    },
  });
}
