import { Request, Response } from "express";
import { prisma } from "../config/database";

export const CourseController = {
   async getAll(req:Request,res:Response) {
    try {
        const courses = await prisma.course.findMany({
            select: {
                id: true,
                courseId: true,
                name: true,
                description: true,
                credits: true,
                departmentId: true,
                instructorId: true,
                capacity: true,
                createdAt: true,
                updatedAt: true,
                instructor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: { name: "asc" },
        });
        
        return res.status(200).json(courses);
    } catch (error:any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
   },
   
   async getById(req:Request,res:Response) {
    try {
        const { id } = req.params;
        const course = await prisma.course.findUnique({
            where: { id: id as string },
            include: {
                instructor: true,  
            },
        });
        return res.status(200).json(course);
    } catch (error:any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
   },

   async create(req:Request,res:Response) {
    try {
        const { courseId, name, description, credits, departmentId, instructorId, capacity } = req.body;
        const course = await prisma.course.create({
            data: { courseId, name, description, credits, departmentId, instructorId, capacity },
          
        });
        return res.status(201).json(course);
    } catch (error:any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
   },

   async update(req:Request,res:Response) {
    try {
        const { id } = req.params;
        const { courseId, name, description, credits, departmentId, instructorId, capacity } = req.body;
        const course = await prisma.course.update({
            where: { id: id as string },
            data: { courseId,name, description, credits, departmentId, instructorId, capacity },
        });
        return res.status(202).json(course);
    }catch(error:any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
   },



   async delete(req:Request,res:Response) {
    try {
        const { id } = req.params;
        const course = await prisma.course.delete({
            where: { id: id as string },
        });
        return res.status(200).json(course);
    } catch (error:any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
   },
}