import {TacheService} from '../services/TacheService'
import { Request, Response } from 'express'
import {sechemTache} from '../validators/validate'
import { error } from 'console'
import { Taches } from '@prisma/client'
import id from 'zod/v4/locales/id.js'
import { AuthRequest } from '../middlewares/Authmiddleware'

const service = new TacheService

export class TacheController{
 
async getAll(req: Request, res: Response) {
  try {
    const data = await service.findAll(); 
    return res.status(200).json(data);    
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
}

  async create(req:AuthRequest, res: Response){
   try {
    const user =req.user
    if(!user) res.status(401).json({message : 'user non trouve'})
    const tache = sechemTache.parse(req.body) 
    // if(!tache.success)return res.status(400).json({message :"error creation", error : tache.error.format});
    const a =await service.createTache({
      ...req.body,
        usersid : user?.id
    })
    res.json(a)
   } catch (error: any) {
    res.status(400).json({error : error.message})
   } 
  }

  async getOne(req:Request<{id:string}>, res: Response){
    const idparams = req.params.id
    if(!idparams)return res.status(400).json({message:'id est requis'});
    const id = parseInt(idparams)
    if(Number.isNaN(id)) return res.json({message: 'id doit etre un nombre'})
      const a = await service.findId(id)
    res.status(200).json(a)
  }

  async updateOne(req:Request<{id:string}>, res: Response){
     const idparams = req.params.id
     if(!idparams)return res.status(400).json({message: 'id obligatoire'});
     const id = parseInt(idparams);
     if(Number.isNaN(id)) return res.json({message : 'nombre'})
      const data = sechemTache.safeParse(req.body)
     if(!data.success)return res.status(404).json({message:'donnees requise'})
      const u = await service.updateId(id,data.data)
    res.status(200).json(u)
  }

async Tachedelete(req: Request<{id: string}>, res: Response) {
  const idparams = req.params.id;
  if (!idparams) {
    return res.status(400).json({ message: 'id est requis' });
  }

  const id = parseInt(idparams);

  try {
    await service.deleteTache(id);
    return res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
}

}