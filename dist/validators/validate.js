"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaassociation = exports.schemalogin = exports.schemaUser = exports.sechemTache = void 0;
const zod_1 = require("zod");
exports.sechemTache = zod_1.z.object({
    titre: zod_1.z.string().min(1, 'le titre doit depasse un caractre'),
    description: zod_1.z.string().min(1, 'la description doit etre au moins 1 caracteres'),
    photoUrl: zod_1.z.string().nullable().optional(),
    audioUrl: zod_1.z.string().nullable().optional(),
    dateDebut: zod_1.z.union([zod_1.z.string(), zod_1.z.date(), zod_1.z.null()]).optional(),
    dateFin: zod_1.z.union([zod_1.z.string(), zod_1.z.date(), zod_1.z.null()]).optional()
    // statut : z.string().min(1,'encours par defaut')
});
exports.schemaUser = zod_1.z.object({
    name: zod_1.z.string().min(1, 'le requis est requis'),
    email: zod_1.z.string().min(1, 'doit contenir les normes dune bnne adresse email'),
    login: zod_1.z.string().min(1, 'le login doit etre unique'),
    password: zod_1.z.string().min(1, 'le mdp est requis et doit avoir 8 caracteres au minim')
});
exports.schemalogin = zod_1.z.object({
    email: zod_1.z.string().email('email invalide'),
    password: zod_1.z.string().min(1, 'le mdp est requis et doit avoir 8 caracteres au minim')
});
exports.schemaassociation = zod_1.z.object({
    usersId: zod_1.z.string().min(1),
    tacheId: zod_1.z.string().min(1)
});
//# sourceMappingURL=validate.js.map