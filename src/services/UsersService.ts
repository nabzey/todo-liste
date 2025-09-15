import { Users } from "@prisma/client";
import { UserRepository } from "../repository/UserRepository";
import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
import id from "zod/v4/locales/id.js";
import { Ilogin } from "../repository/UserRepository";
import { error } from "console";
dotenv.config();


const repos = new UserRepository

export class UsersService {

    async findUsers(){
    return await repos.findAll()
    }
  async findUser(id:number){
    return await repos.findById
  }

 async create(users:Users){
     const pass = await bcrypt.hash(users.password,10)
     const data = repos.create({
      ...users,
        password: pass
      })
     return data;
}
   async update(id:number,data:Partial<Users>){
    return await repos.update(id, data)
   }

   async deleteuser (id:number){
    await repos.delete(id)
   }
   
 async loginUser(perso:Ilogin) {
  const users = await repos.findByEmail(perso.email) as Users;
  if (!users)  throw new Error("utilisateur non trouve")
  const data = await bcrypt.compare(perso.password, users.password);
  if (!data) throw new Error("passe incorredte")

  const accesToken = Jwt.sign(
   {
     id : users.id,
    email: users.email
   },
   process.env.JWT_SECRETE as string,
  {expiresIn:"1h"}
  )
  const refreshToken = Jwt.sign(
   {
    email: users.email
   },
   process.env.JWT_SECRETE as string,
  {expiresIn:"1d"}
  )
   return {users,accesToken, refreshToken};
}

   async refresh(perso:Ilogin){
   const user = await repos.findByEmail(perso.email);

  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  const accesToken = Jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRETE as string,
    { expiresIn: "24h" }
  );

  return {
    accesToken
  };
             }

  async Update(id:number,data:Partial<Users>){
    return await repos.updatestatus(id, data)
   }
}




