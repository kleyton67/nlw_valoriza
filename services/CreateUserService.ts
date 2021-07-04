import { UserRepositories } from "../repositories/UsersRepositories"
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs"

interface IUserRequest{
    name: string;
    email: string;
    admin: boolean;
    password: string;
}

class CreateUserService{
    async execute({name, email, admin, password} : IUserRequest){
        const usersRepository = getCustomRepository(UserRepositories);

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        const passwordHash = await hash(password, 8)

        if(!email){
            throw new Error("Email incorreto")
        }

        if (userAlreadyExists){
            throw new Error ("User already exists");
        }

        const user = usersRepository.create({
            name,
            email,
            admin,
            password : passwordHash, //updated value
        });

        await usersRepository.save(user);
        
        return user;
    }
}

export { CreateUserService }