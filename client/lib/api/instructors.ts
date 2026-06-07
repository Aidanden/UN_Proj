import { api } from "./client";
import type {Instructor,CreateInstructorInput,UpdateInstructorInput} from "@/lib/types/instructor";


export function getInstructors() {
    return api<Instructor[]>("/api/instructors");
}




export function getInstructorById(id: string) {
    return api<Instructor>(`/api/instructors/${id}`);

}


export function createInstructor(data: CreateInstructorInput) {
    return api<Instructor>(`/api/instructors`, {
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
