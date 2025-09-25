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
    // Ajout du chemin complet pour les images
    const newData = data.map(task => {
      if (task.photoUrl) {
        return {
          ...task,
          photoUrl: `${req.protocol}://${req.get('host')}${task.photoUrl}`
        };
      }
      return task;
    });
    return res.status(200).json(newData);    
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
}

  async create(req:AuthRequest, res: Response){
   try {
    const user =req.user
    if(!user) return res.status(401).json({message : 'user non trouve'})
    let photoUrl: string | null = null;
    if (req.file) {
      photoUrl = `/uploads/${req.file.filename}`;
    }
    const tacheData = {
      titre: req.body.titre,
      description: req.body.description,
      photoUrl: photoUrl,
      statut: req.body.statut || 'EN_COURS'
    };
    const tache = sechemTache.parse(tacheData);
    const a = await service.createTache({
      ...tacheData,
      usersid: user?.id
    });
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
      // Récupérer la tâche existante
      const existing = await service.findId(id);
      let photoUrl;
      if (req.file) {
        photoUrl = `/uploads/${req.file.filename}`;
      } else if (
        req.body.photoUrl !== undefined &&
        req.body.photoUrl !== null &&
        req.body.photoUrl !== '' &&
        req.body.photoUrl !== 'null'
      ) {
        photoUrl = req.body.photoUrl;
      } else if (existing && existing.photoUrl) {
        photoUrl = existing.photoUrl;
      } else {
        photoUrl = null;
      }
      const updateData = {
        ...data.data,
        photoUrl,
        statut: req.body.statut // permet de modifier l'état
      };
      const u = await service.updateId(id, updateData)
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