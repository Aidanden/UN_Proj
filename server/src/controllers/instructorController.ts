import { Request, Response } from "express";
import { prisma } from "../config/database";




export const InstructorController = {
   async getAll(req:Request,res:Response) {
try {
    const {search} = req.query;
    const instructors = await prisma.instructor.findMany({
        where: 
            (search && {
                OR: [
                    {firstName: {contains: search as string}},
                    {lastName: {contains: search as string}},
                    {email: {contains: search as string}},
                ],
            }),
          include: {
            courses: true,
        },
    });
    return res.status(200).json(instructors);
}catch(error: any) {
    return res.status(500).json({message: "Internal server error",error: error.message});
}
},
async getById(req:Request,res:Response) {
    try {
    const {id} = req.params;
    const instructor = await prisma.instructor.findUnique({
        where: {id: id as string},
    });
    return res.status(200).json(instructor);
}catch(error: any) {
    return res.status(500).json({message: "Internal server error",error: error.message});
}
},

async create(req:Request,res:Response) {
    try {
    const {employeeId,firstName,lastName,email,phone,address,dateOfBirth,gender,departmentId,hireDate} = req.body;
    const instructor = await prisma.instructor.create({
        data: {employeeId,firstName,lastName,email,phone,address,dateOfBirth : new Date(dateOfBirth),gender,departmentId,hireDate : new Date(hireDate)},
    });
    return res.status(201).json(instructor);
}catch(error: any) {
   
        return res.status(400).json({message: "error in date please check new date format code"});
      }
},


async update(req:Request,res:Response) {
    try {
    const {id} = req.params;
    const {employeeId,firstName,lastName,email,phone,address,dateOfBirth,gender,departmentId,hireDate} = req.body;
    const instructor = await prisma.instructor.update({
        where: {id: id as string},
        data: {employeeId,firstName,lastName,email,phone,address,dateOfBirth,gender,departmentId,hireDate},
    });
    return res.status(202).json(instructor);
}catch(error: any) {
    return res.status(500).json({message: "Internal server error",error: error.message});
}
},



async delete(req:Request,res:Response) {
    try {
    const {id} = req.params;
    const instructor = await prisma.instructor.delete({
        where: {id: id as string},
    });
    return res.status(203).json(instructor);
}catch(error: any) {
    return res.status(500).json({message: "Internal server error",error: error.message});
}
},
}