import { Request, Response } from "express";
import { prisma } from "../config/database";

export const DepartmentController = {

    async getAll(req:Request,res:Response) {
      const departments = await prisma.department.findMany({
        include: {
          _count: { select: { students: true } },
        },
        orderBy: { name: "asc" },
      });

     res.json(departments);
    },

    async getById(req:Request,res:Response) {
    const {id} = req.params; 
    const department = await prisma.department.findUnique({
        where:{
            id:id as string,
        },
        include: {
          _count: { select: { students: true } },
        },
    })
    if(!department) {
        return res.status(404).json({message: "Department not found"});
    }
    res.json(department);
},

    async create(req:Request,res:Response) {
        try{
            const {name,code,description} = req.body;
            const department = await prisma.department.create({
                data: {
                    name,
                    code,
                    description,
                },
            });
            return res.status(201).json({message: "Department created successfully",department});



        }catch(error:any) {
            return res.status(500).json({message: "Internal server error"});
        }
    },
    async update(req:Request,res:Response) {
        try{
            const {id} = req.params;
            const {name,code,description} = req.body;
            const department = await prisma.department.update({
                where: {id:id as string},
                data: {name,code,description},
            });
            res.json(department);
        }catch(error:any) {
            return res.status(500).json({message: "Internal server error"});
        }
    },
    async delete(req:Request,res:Response) {
        try{
            const {id} = req.params;
            const department = await prisma.department.delete({
                where: {id:id as string},
            });
            res.json(department);
        }catch(error:any) {
            return res.status(500).json({message: "Internal server error"});
        }
    },
    }

    






    





