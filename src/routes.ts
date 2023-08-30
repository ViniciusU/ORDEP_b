import { request, response, Router } from "express";
import {CreateUserController} from "./modules/Acount/CreateUser/CreateUserControllers"
import {AuthenticateClientController} from "./modules/Acount/Authenticate/AuthenticateUserControllers"
import {ensureAuthenticateUser} from "./middlewares/ensureUserAuthenticate"
import { prisma } from "./database/prismaClient";

const routes = Router();
const createUserController = new CreateUserController(); 
const authenticateClientController = new AuthenticateClientController();


routes.post("/create/user",(request, response)=>  createUserController.handle(request, response) )
routes.post("/authenticate",(request, response)=>  authenticateClientController.handle(request, response) )

routes.get('/users', async (request, response) => {
  
  
    const users = await prisma.user.findMany()
  
    return response.json(users)
  })





export {routes};