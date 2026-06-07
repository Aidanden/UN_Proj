import { Request, Response, NextFunction } from "express";



export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    console.error(err.stack);
    if (err.code==="P2025") {
        return res.status(404).json({message: "Record not found"});
    }
    if (err.code==="P2002") {
        return res.status(400).json({message: "error in date please check new date format code"});
    }
   


};
