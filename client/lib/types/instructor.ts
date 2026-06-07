export interface Instructor {
    id: string 
    employeeId :string 
    firstName :string
    lastName :string
    email :string 
    phone :string 
    address :string | null
    dateOfBirth :Date
    gender :Gender
    departmentId :string
    hireDate :Date
    createdAt :Date
    updatedAt :Date
    
   

}


enum Gender {
    MALE,
    FEMALE
}


export type CreateInstructorInput = {
    employeeId :string
    firstName :string
    lastName :string
    email :string
    phone :string
    address :string | null
    dateOfBirth :Date
    gender :Gender
    departmentId :string
    hireDate :Date
}

export type UpdateInstructorInput = CreateInstructorInput;