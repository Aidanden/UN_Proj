import { api } from "./client";
import type { Course, CreateCourseInput, UpdateCourseInput } from "@/lib/types/course";




export function getCourses() {
    return api<Course[]>("/api/courses");
}

export function getCourseById(id: string) {
    return api<Course>(`/api/courses/${id}`);

}


export function createCourse(data: CreateCourseInput) {
    return api<Course>("/api/courses", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateCourse(id: string, data: UpdateCourseInput) {
    return api<Course>(`/api/courses/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export function deleteCourse(id: string) {
    return api<Course>(`/api/courses/${id}`, {
        method: "DELETE",
    });
}