import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { CreateTagController } from "../controllers/CreateTagController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { CreateComplimentController } from "../controllers/CreateComplimentController";
import { ensureAuthentication } from "../middlewares/ensureAuthenticated";
import { ListTagsController } from "../controllers/ListTagsController";
import { ListUserSendComplimentsController } from "../controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "../controllers/ListUserReceiveComplimentsController";
import { ListUserController } from "../controllers/ListUserController"; 
// migration -> Entidade -> Repositorio -> Service -> Controller -> Servico

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticationUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listTagsController = new ListTagsController();
const listSentComplimentsController = new ListUserSendComplimentsController();
const listReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserController = new ListUserController();

// Cria um novo usuário
router.post("/users", createUserController.handle);

// Loga um novo usuário
router.post("/login", authenticationUserController.handle);

// Cria um elogio
router.post("/compliments", ensureAuthentication, createComplimentController.handle);

// Middlewares podem ser colocados na requisição

// Criar uma nova TAG
router.post("/tags", ensureAuthentication, ensureAdmin, createTagController.handle);

// Obtém todas as tags existentes
router.get("/tags", ensureAuthentication, listTagsController.handle)

//Obtém elogios enviados pelo usuario : /server/compliments/sender/id
router.get("/compliments/sender/", ensureAuthentication, listSentComplimentsController.handle)

//Obtém os elogios recebidos
router.get("/compliments/received/", ensureAuthentication, listReceiveComplimentsController.handle)

//Obtém os usuários do Banco
router.get("/users", ensureAuthentication, listUserController.handle)

export { router }