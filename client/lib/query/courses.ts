"use client";


import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";


import { getCourses,getCourseById, createCourse, updateCourse, deleteCourse } from "@/lib/api/courses";
import { queryKeys } from "./query-keys";
import type { CreateCourseInput, UpdateCourseInput } from "@/lib/types/course";



export function useCourses() {
    return useQuery({
        queryKey: queryKeys.courses.all,
        queryFn: getCourses,
    });
}

export function useCourse(id: string) {
    return useQuery({
        queryKey: queryKeys.courses.detail(id),
        queryFn: () => getCourseById(id),
        enabled: !!id,
    });
}


export function useCreateCourse() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateCourseInput) => createCourse(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
        },
    });
}

export function useUpdateCourse() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateCourseInput }) => updateCourse(id, data),
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.detail(id) });
        },
    });
}

export function useDeleteCourse() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCourse,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
        },
    });
}