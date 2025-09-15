import { Taches } from "@prisma/client";
import { IRepository } from "./IRepository";
export declare class TacheRepository implements IRepository<Taches> {
    findAll(): Promise<Taches[]>;
    create(data: Omit<Taches, "id">): Promise<Taches>;
    findById(id: number): Promise<Taches | null>;
    update(id: number, data: Partial<Taches>): Promise<Taches>;
    delete(id: number): Promise<void>;
    tachedelete(id: number, usersid: string): Promise<void>;
}
//# sourceMappingURL=TacheRepository.d.ts.map