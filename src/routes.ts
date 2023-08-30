import { request, response, Router } from "express";
import {CreateUserController} from "./modules/Acount/CreateUser/CreateUserControllers"
import {AuthenticateClientController} from "./modules/Acount/Authenticate/AuthenticateUserControllers"
import {ensureAuthenticateUser} from "./middlewares/ensureUserAuthenticate"

const routes = Router();
const createUserController = new CreateUserController(); 
const authenticateClientController = new AuthenticateClientController();


routes.post("/create/user",(request, response)=>  createUserController.handle(request, response) )
routes.post("/authenticate",(request, response)=>  authenticateClientController.handle(request, response) )





export {routes};