import { Request, Response } from "express";
import { prisma } from "../config/database";

export const EnrollmentController = {


    async getAll(req:Request,res:Response) {
        try {
            const enrollments = await prisma.enrollment.findMany({
                orderBy: { enrollmentDate: "desc" },
            });
            return res.status(200).json(enrollments);
        } catch (error:any) {
            return res.status(500).json({message: "Internal server error",error: error.message});
        }
    },
    
    async getById(req:Request,res:Response) {
        try {
            const {id} = req.params;
            const enrollment = await prisma.enrollment.findUnique({
                where: {id: id as string},
            });
            return res.status(200).json(enrollment);
        } catch (error:any) {
            return res.status(500).json({message: "Internal server error",error: error.message});
        }
    },
    async create(req:Request,res:Response) {
        try {
            const {studentId,courseId,enrollmentDate,grade,gradePoint,attendance,status} = req.body;
            const enrollment = await prisma.enrollment.create({
                data: {studentId,courseId,enrollmentDate : new Date(enrollmentDate),grade,gradePoint,attendance,status},
            });
            return res.status(201).json(enrollment);
        } catch (error:any) {
            return res.status(500).json({message: "Internal server error",error: error.message});
        }
    },
    async update(req:Request,res:Response) {
        try {
            const {id} = req.params;
            const {studentId,courseId,enrollmentDate,grade,gradePoint,attendance,status} = req.body;
            const enrollment = await prisma.enrollment.update({
                where: {id: id as string},
                data: {studentId,courseId,enrollmentDate : new Date(enrollmentDate),grade,gradePoint,attendance,status},
            });

        
        return res.status(202).json(enrollment);
        } catch (error:any) {
            return res.status(500).json({message: "Internal server error",error: error.message});
        }
    },
    async delete(req:Request,res:Response) {
        try {
            const {id} = req.params;
            const enrollment = await prisma.enrollment.delete({
                where: {id: id as string},
            });
            return res.status(203).json(enrollment);
        } catch (error:any) {
            return res.status(500).json({message: "Internal server error",error: error.message});
        }
    }



}
