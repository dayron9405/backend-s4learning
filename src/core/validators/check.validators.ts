import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";


export async function checkValidators(req: Request, res: Response, next: NextFunction) {
    try {
        const checkResult = validationResult(req);
        if (!checkResult.isEmpty()) {
            const message = {
                status: 400,
                message: 'Error with sent data',
                error: checkResult.array()
            }
            return res.status(400).json(message);
        } else {
            return next();
        }
    } catch (error) {
        return error;
    }
}