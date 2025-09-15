import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}
export declare function authentificate(req: AuthRequest, res: Response, next: NextFunction): void;
export default authentificate;
//# sourceMappingURL=Authmiddleware.d.ts.map