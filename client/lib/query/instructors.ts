"use client";


import { useQuery,useMutation,useQueryClient} from "@tanstack/react-query";
import {CreateInstructorInput,UpdateInstructorInput} from "@/lib/types/instructor";

import { getInstructors,getInstructorById,createInstructor,updateInstructor,deleteInstructor} from "@/lib/api/instructors";
import { queryKeys } from "./query-keys";

export function useInstructors() {
    return useQuery({
        queryKey: queryKeys.instructors.all,
        queryFn: getInstructors,
    });
}


export function useInstructor(id: string) {
    return useQuery({
        queryKey: queryKeys.courses.detail(id),
        queryFn: () => getInstructorById(id),
        enabled: !!id,
    });
}


export function useCreateInstructor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateInstructorInput) => createInstructor(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
        },
    });
}

export function useUpdateInstructor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateInstructorInput }) => updateInstructor(id, data),
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.detail(id) });
        },
    });
}

export function useDeletetructor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteInstructor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
        },
    });
}