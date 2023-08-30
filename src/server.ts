import "express-async-errors";
import "express-form-data";
import express, { NextFunction, Request, Response }  from "express";
import { request, response, Router } from "express";
import {CreateUserController} from "./modules/Acount/CreateUser/CreateUserControllers"
import {AuthenticateClientController} from "./modules/Acount/Authenticate/AuthenticateUserControllers"
import {ensureAuthenticateUser} from "./middlewares/ensureUserAuthenticate"
import { prisma } from "./database/prismaClient";

const formData = require('express-form-data');
var cors = require('cors');
const createUserController = new CreateUserController(); 
const authenticateClientController = new AuthenticateClientController();

// use it before all route definitions kk
const port = process.env.PORT || 5000
const app = express();
app.use(express.json());








app.get("/", (request,response)=>{
    return response.json({
        message: "Hello world"
    });
});


app.use(
    (err: Error, request: Request, response: Response, next: NextFunction)=>{
    if(err instanceof Error){
        return response.status(400).json({message: err.message});
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});


app.post("/create/user",(request, response)=>  createUserController.handle(request, response) )
app.post("/authenticate",(request, response)=>  authenticateClientController.handle(request, response) )

app.get('/users', async (request, response) => {
  
  
    const users = await prisma.user.findMany()
  
    return response.json(users)
  })

app.listen(port, () => console.log("Server is running"));