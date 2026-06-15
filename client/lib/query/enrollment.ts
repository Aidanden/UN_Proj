"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEnrollments, getEnrollmentById, createEnrollment, updateEnrollment, deleteEnrollment } from "@/lib/api/enrollment";
import { queryKeys } from "./query-keys";
import type { CreateEnrollmentInput, UpdateEnrollmentInput } from "@/lib/types/enrillment";


export function useEnrollments() {
    return useQuery({
        queryKey: queryKeys.enrollments.all,
        queryFn: getEnrollments,
    });
}

export function useEnrollment(id: string) {
    return useQuery({
        queryKey: queryKeys.enrollments.detail(id),
        queryFn: () => getEnrollmentById(id),
        enabled: !!id,
    });
}

export function useCreateEnrollment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateEnrollmentInput) => createEnrollment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.all });
        },
    });
}

export function useUpdateEnrollment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateEnrollmentInput }) => updateEnrollment(id, data),
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.detail(id) });
        },
    });
}

export function useDeleteEnrollment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteEnrollment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.all });
        },
    });
}