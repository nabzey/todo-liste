import { z } from 'zod';
export declare const sechemTache: z.ZodObject<{
    titre: z.ZodString;
    description: z.ZodString;
}, z.core.$strip>;
export declare const schemaUser: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    login: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const schemalogin: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const schemaassociation: z.ZodObject<{
    usersId: z.ZodString;
    tacheId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=validate.d.ts.map