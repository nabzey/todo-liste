import { NextFunction, Request, Response } from "express"
import { AssocciationRepository } from "../repository/AssociationRepository"
import { Association, Choix } from "@prisma/client"
import { TacheService } from "../services/TacheService"
import { AuthRequest } from "./Authmiddleware"


const service = new TacheService()
const repos = AssocciationRepository


     export function acces(req:AuthRequest, res:Response,next:NextFunction) {
        
    const idtache = Number(req.params.id)
    const permission = {
       usersId : req.user?.id,
       tacheId : idtache,
       permission : req.method === "PUT"? Choix.MODIFIER : Choix.SUPPRIMER
   } as Omit<Association,"id">
    if (!permission) {
      return res.status(401).json({ message: "Accès interdit" });
    }
    next()
    }
