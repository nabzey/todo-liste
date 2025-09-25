import { Taches } from '@prisma/client'
import {TacheRepository} from '../repository/TacheRepository'
import { omit } from 'zod/mini'

 const repos = new TacheRepository()
export class TacheService{

 async findAll(){
    return await repos.findAll()
 }
 async createTache(tache: Omit<Taches, 'id'>){
    return await repos.create(tache);
 }

  async findId(id:number){
   return await repos.findById(id)
  }
  async updateId(id:number,data:Partial<Taches>){
   return await repos.update(id, data)
  }

   // async deleteTache(id:number , usersid: string){   
   // const tache = await repos.findById(id)
   //  if(!tache)throw Error('')
   // // const perm = await repos.tachedelete({id, usersid})
   // }
  async deleteTache(id:number){   
    await repos.delete(id)
  }
}