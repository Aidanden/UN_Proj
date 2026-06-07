import { Instructor } from "./instructor";
import { Department } from "./department";

export interface Course {

    id:string
    courseId :string 
    name :string
    description :string | null
    credits :number
    departmentId :string
    instructorId :string
    capacity :number
    createdAt :Date
    updatedAt :Date
    instructor? :Instructor
    department? :Department

}

export type CreateCourseInput = {
    courseId :string
    name :string
    description :string | null
    credits :number
    departmentId :string
    instructorId :string
    capacity :number
}

export type UpdateCourseInput = CreateCourseInput;