import { Users } from "@prisma/client";
import { IRepository } from "./IRepository";
export type Ilogin = {
    id: number;
    email: string;
    password: string;
};
export declare class UserRepository implements IRepository<Users> {
    findAll(): Promise<Users[]>;
    findById(id: number): Promise<Users | null>;
    create(data: Omit<Users, "id">): Promise<Users>;
    update(id: number, data: Partial<Users>): Promise<Users>;
    delete(id: number): Promise<void>;
    findByEmail(email: string): Promise<Ilogin | null>;
    updatestatus(id: number, data: Partial<Users>): Promise<Users>;
}
//# sourceMappingURL=UserRepository.d.ts.map