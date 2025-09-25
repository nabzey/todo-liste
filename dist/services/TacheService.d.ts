import { Taches } from '@prisma/client';
export declare class TacheService {
    findAll(): Promise<{
        id: number;
        titre: string;
        description: string;
        photoUrl: string | null;
        audioUrl: string | null;
        dateDebut: Date | null;
        dateFin: Date | null;
        statut: import("@prisma/client").$Enums.Etat;
        usersid: number;
    }[]>;
    createTache(tache: Omit<Taches, 'id'>): Promise<{
        id: number;
        titre: string;
        description: string;
        photoUrl: string | null;
        audioUrl: string | null;
        dateDebut: Date | null;
        dateFin: Date | null;
        statut: import("@prisma/client").$Enums.Etat;
        usersid: number;
    }>;
    findId(id: number): Promise<{
        id: number;
        titre: string;
        description: string;
        photoUrl: string | null;
        audioUrl: string | null;
        dateDebut: Date | null;
        dateFin: Date | null;
        statut: import("@prisma/client").$Enums.Etat;
        usersid: number;
    } | null>;
    updateId(id: number, data: Partial<Taches>): Promise<{
        id: number;
        titre: string;
        description: string;
        photoUrl: string | null;
        audioUrl: string | null;
        dateDebut: Date | null;
        dateFin: Date | null;
        statut: import("@prisma/client").$Enums.Etat;
        usersid: number;
    }>;
    deleteTache(id: number): Promise<void>;
}
//# sourceMappingURL=TacheService.d.ts.map