import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";

class ListUserService{
    async execute (){
        const usersRepositories = getCustomRepository(UserRepositories);
        const users = usersRepositories.find();
        console.log("Here service", users)
        return users;
    }
}

export { ListUserService }