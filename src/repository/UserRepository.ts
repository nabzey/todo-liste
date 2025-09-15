import { PrismaClient, Users } from "@prisma/client";
import { IRepository } from "./IRepository";
 
const prisma = new PrismaClient

  
   export type Ilogin={
    id:number,
    email:string,
    password:string  
   }

export class UserRepository implements IRepository <Users>{

   async findAll():Promise<Users[]>{
    return  await  prisma.users.findMany()
    }
   async findById(id:number):Promise<Users|null>{
   return await prisma.users.findUnique({where : {id}})
    }
    
     create (data:Omit<Users,"id">) : Promise<Users>{
    return  prisma.users.create({
        data
    })
    }

   async update (id:number,data:Partial<Users>): Promise<Users>{
    return await prisma.users.update({
        where : {id},
        data
    })
   }

   async delete(id:number) :Promise<void>{
    await prisma.users.delete({where : {id}})
   }

 
   async findByEmail(email:string):Promise<Ilogin | null>{
    return await prisma.users.findUnique(
        {
            where: {email}
    })
   }

    async updatestatus(id:number,data:Partial<Users>): Promise<Users>{
    return await prisma.users.update({
        where : {id},
        data
    })
   }
}