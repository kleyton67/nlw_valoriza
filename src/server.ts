import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
// Inserir logo abaixo do express
import { router } from "./routes";
import "reflect-metadata";

import "../database"

// Types in 
//@types/express
const app = express();

/**
 * GET => Buscar info
 * POST => Inserir informação
 * PUT => Alterar informação
 * DELETE => Remover dado
 * PATCH => Alterar informação específica
 */

app.get("/test", (request, response) => {
    /**
     * Request => Entrando
     * Response => Enviando
     */
    return response.send("Olá")
});

app.use(express.json())

app.use(router);

//middleware de erro

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(err)
    if (err instanceof Error){
        return response.status(400).json({
            error: err.message
        }
        );
    }
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

app.listen(3000, () => console.log("Server is running NLW"))