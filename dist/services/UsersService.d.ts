import { Users } from "@prisma/client";
import { Ilogin } from "../repository/UserRepository";
export declare class UsersService {
    findUsers(): Promise<{
        id: number;
        name: string;
        email: string;
        login: string;
        password: string;
    }[]>;
    findUser(id: number): Promise<(id: number) => Promise<Users | null>>;
    create(users: Users): Promise<{
        id: number;
        name: string;
        email: string;
        login: string;
        password: string;
    }>;
    update(id: number, data: Partial<Users>): Promise<{
        id: number;
        name: string;
        email: string;
        login: string;
        password: string;
    }>;
    deleteuser(id: number): Promise<void>;
    loginUser(perso: Ilogin): Promise<{
        users: {
            id: number;
            name: string;
            email: string;
            login: string;
            password: string;
        };
        accesToken: string;
        refreshToken: string;
    }>;
    refresh(perso: Ilogin): Promise<{
        accesToken: string;
    }>;
    Update(id: number, data: Partial<Users>): Promise<{
        id: number;
        name: string;
        email: string;
        login: string;
        password: string;
    }>;
}
//# sourceMappingURL=UsersService.d.ts.map