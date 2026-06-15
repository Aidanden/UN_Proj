"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } from "@/lib/api/student";
import { queryKeys } from "./query-keys";
import type { CreateStudentInput, UpdateStudentInput } from "@/lib/types/student";




export function useStudents() {
    return useQuery({
        queryKey: queryKeys.students.all,
        queryFn: getStudents,
    });
}

export function useStudent(id: string) {
    return useQuery({
        queryKey: queryKeys.students.detail(id),
        queryFn: () => getStudentById(id),
        enabled: !!id,
    });
}

export function useCreateStudent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateStudentInput) => createStudent(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
        },
    });
}

export function useUpdateStudent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateStudentInput }) => updateStudent(id, data),    
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.students.detail(id) });
        },
    });
}

export function useDeleteStudent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
        },
    });
}