import { PrismaClient,Taches} from "@prisma/client";
import { IRepository} from "./IRepository";

const prisma = new PrismaClient();

export class TacheRepository implements IRepository<Taches>{

   async findAll():Promise<Taches[]>{
  return await prisma.taches.findMany();
   }
    async create(data:Omit<Taches,"id">) : Promise<Taches>{
        return  prisma.taches.create({
            data 
        })
    }

    async findById(id:number) : Promise<Taches|null>{
    return prisma.taches.findUnique({where : {id}})
    }
    async  update(id:number,data:Partial<Taches>): Promise<Taches>{
        return prisma.taches.update({
             where: {id},
             data
        })
    }

    async delete(id:number) :Promise<void>{
     await prisma.taches.delete({where:{id}})
    }
    async tachedelete(id:number,usersid:string) :Promise<void>{
     await prisma.taches.delete({where:{id}})
    }
}