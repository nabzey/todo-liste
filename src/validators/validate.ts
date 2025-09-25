import {email, z}from 'zod'

export const sechemTache =z.object({
    titre : z.string().min(1,'le titre doit depasse un caractre'),
    description : z.string().min(1,'la description doit etre au moins 1 caracteres'),
    photoUrl: z.string().nullable().optional(),
    audioUrl: z.string().nullable().optional(),
    dateDebut: z.union([z.string(), z.date(), z.null()]).optional(),
    dateFin: z.union([z.string(), z.date(), z.null()]).optional()
    // statut : z.string().min(1,'encours par defaut')
})
 
export const schemaUser =z.object({
    name: z.string().min(1, 'le requis est requis'),
    email :z.string().min(1,'doit contenir les normes dune bnne adresse email'),
    login:z.string().min(1,'le login doit etre unique'),
    password:z.string().min(1,'le mdp est requis et doit avoir 8 caracteres au minim')
})


export const schemalogin =z.object({
    email: z.string().email('email invalide'),
    password:z.string().min(1,'le mdp est requis et doit avoir 8 caracteres au minim')
})
 
export const schemaassociation=z.object({
    usersId : z.string().min(1),
    tacheId : z.string().min(1)
})