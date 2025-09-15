import { NextFunction, Response } from "express";
import { TacheService } from "../services/TacheService";
import { AuthRequest } from "./Authmiddleware";
import { AssocciationRepository } from "../repository/AssociationRepository";
import { Association, Choix } from "@prisma/client";
import { schemaassociation, schemalogin } from "../validators/validate";






const service = new TacheService
const repos = new AssocciationRepository


export class PerMiddleware {

static async permi (req:AuthRequest, res:Response, next: NextFunction){
   try {
    const idtache = Number(req.params.id)
    const tache = await service.findId(idtache)
    if(tache?.usersid !== req.user?.id) {
        const data = {
      usersId: req.user?.id!,
      tacheId: idtache,
      permission : req.method === "PUT"? Choix.MODIFIER : Choix.SUPPRIMER
    } as Omit<Association, "id">;
         const permis = await repos.findById(data)
      if(!permis){
        return res.status(401).json({message: 'pas de permission pour modifier'})
      } 
    }
     next()
   } catch (error) {
   return res.status(500).json({message: 'erreur serveur'})
}
}
}