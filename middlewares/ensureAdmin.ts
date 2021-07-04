import {Request, Response, NextFunction} from "express";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";

export function ensureAdmin(request:Request, response:Response, next: NextFunction){
    const usersRepositories = getCustomRepository(UserRepositories);

    const { user_id } = request;

    const admin = usersRepositories.findOne(user_id)

    if(admin){
        return next();
    }

    return response.status(401).json({
        error:"Unauthorized"
    });
};
