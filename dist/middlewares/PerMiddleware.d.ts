import { NextFunction, Response } from "express";
import { AuthRequest } from "./Authmiddleware";
export declare class PerMiddleware {
    static permi(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=PerMiddleware.d.ts.map