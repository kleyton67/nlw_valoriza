import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface IPayload {
    sub: string
}

function ensureAuthentication(
    request: Request,
    response: Response,
    next: NextFunction
) {
    //Pega o token
    const authToken = request.headers.authorization;

    //Verifica se tem token
    if (!authToken) {
        return response.status(401).end();
    }

    try {
        const { sub } = verify(
            authToken,
            "bd5b88fe94a1afeb6906a0957b98df15"
        ) as IPayload;

        request.user_id = sub;

        return next();
    } catch (err) {
        return response.status(401).end()
    }

}

export { ensureAuthentication }