import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { UserRepositories } from "../repositories/UsersRepositories"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest{
    email:  string;
    password : string;
}

class AuthenticateUserService{
    async execute({email, password} : IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UserRepositories);

        const user = await usersRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("Email/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password)
        

        //Utilize any md5 website generate
        const token = sign({
            email: user.email
        }, "bd5b88fe94a1afeb6906a0957b98df15",{
            subject : user.id,
            expiresIn: "1d"
        }
        )
        return token;
    }
}

export { AuthenticateUserService }