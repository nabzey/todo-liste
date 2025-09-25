import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/UsersService";
import {date, jwt, z} from 'zod'
import { schemalogin, schemaUser } from "../validators/validate";
import { error } from "console";
import JWT from "jsonwebtoken";
import { Ilogin } from "../repository/UserRepository";


const service = new UsersService

export class UserController {

    async getAll(req: Request, res: Response){
   try {
    const data= await service.findUsers();
    res.status(200).json(data)
  } catch (error) {
     res.status(400).json({message: 'vous ne pouvez recuper les donnees',error})
  }
    }

    async getOne (req: Request, res: Response){
        try {
            const idparams = req.params.id
            if(!idparams)return res.status(404).json({message: 'erreur'})
              const id = parseInt(idparams);
                 if(Number.isNaN(id)) return res.json({message : 'nombre'})
                  const data = schemaUser.safeParse(req.body)
                 if(!data.success)return res.status(404).json({message:'donnees requise'})
                  const u = await service.update(id,data.data)
                res.status(200).json(u)
            
        } catch (error) {
            
        }
    }
    async createUser(req: Request, res: Response){
          const users = schemaUser.safeParse(req.body) 
            if(!users.success)return res.status(400).json({message :"error", error : users.error.format});
            const a=await service.create(req.body)
            res.status(200).json({
              message:"reussi",
              data:a
            })
    }

     async login(req: Request, res: Response){
      const verif = schemalogin.safeParse(req.body)
      if(!verif.success) return res.status(401).json({message:"invalide",error: verif.error.format()});
      const a= await service.loginUser(req.body)
      res.status(200).json({
        message :'reussi',
        data:a
      })
     }
    

     async tokenrefresh(req:Request, res: Response){
        const bearerToken = req.headers.authorization;
        try {
          if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
          res.status(401).json({ message: "Token is missing" });
          return;
        }

        const token = bearerToken.split(" ")[1];
        const secret = process.env.JWT_SECRETE;

        if (!secret) {
          res.status(401).json({ message: "Clé secrete introuvable" });
          return;
        }

        const payload = JWT.verify(token as string, secret!) as Ilogin;
     
        const accesToken = await service.refresh(payload)
        return res.status(200).json(accesToken)
        } catch (error) {
          
        }
      
    //  const result = schemalogin.safeParse(req.body)
    //       if (!result) 
    //       {return res.status(400).json({ message: 'email invalide'})}
    //      const refresh = await service.refresh(req.body)
    //        return res.status(200).json({ refresh })
      }
    }


   