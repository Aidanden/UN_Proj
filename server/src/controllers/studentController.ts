import { Request, Response } from "express";
import { prisma } from "../config/database";



export const StudentController = {
    async getAll(req:Request,res:Response) {
        const {departmentId,status,search} = req.query;
        const students = await prisma.student.findMany({
            where: {
                ...(departmentId ? { departmentId: departmentId as string } : {}),
                ...(status ? { status: status as any } : {}),
                ...(search && {
                OR: [
                    {firstName: {contains: search as string}},
                    {lastName: {contains: search as string}},
                    {email: {contains: search as string}},
                ],
            }),
        },
            orderBy: {
                createdAt: "desc",
            },
        })

        return res.status(200).json(students);

    },
    async getById(req:Request,res:Response) {
        const {id} = req.params;
        const student = await prisma.student.findUnique({
            where: {
                id: id as string,
            },
        });
        return res.status(200).json(student);
    },
    async create(req:Request,res:Response) {
       try {
        const {studentId,firstName,lastName,email,phone,address,dateOfBirth,gender,status,departmentId,address2,city,state,country} = req.body;
        const student = await prisma.student.create({
            data: {
                studentId,firstName,lastName,email,phone,address,dateOfBirth : new Date(dateOfBirth),gender,status,departmentId,address2,city,state,country,
            },
            include: {
                department: true
              }
        });
        return res.status(201).json(student);
    }catch(error: any)
    {
        return res.status(500).json({message: "Internal server error",error: error.message})
    }
    },
    async update(req:Request,res:Response) {
        try {
            const {id} = req.params;
            const {studentId,firstName,lastName,email,phone,address,dateOfBirth,gender,status,departmentId,address2,city,state,country} = req.body;
            const student = await prisma.student.update({
                where: {id: id as string},
                data: {studentId,firstName,lastName,email,phone,address,dateOfBirth,gender,status,departmentId,address2,city,state,country},
            })
            return res.status(202).json({message: "Student updated successfully",student});
        }catch(error: any)
        {
            return res.status(500).json({message: "Internal server error",error: error.message})
        }
    },

    async delete(req:Request,res:Response) {
        try {
            const {id} = req.params;
            const student = await prisma.student.delete({
                where: {id: id as string},
            });
            return res.status(203).json({message: "Student deleted successfully",student}); // 202 Accepted
        }catch(error: any)
        {
            return res.status(500).json({message: "Internal server error",error: error.message})
        }
    }








}