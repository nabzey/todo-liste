import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/Authmiddleware';
export declare class TacheController {
    getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getOne(req: Request<{
        id: string;
    }>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateOne(req: Request<{
        id: string;
    }>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    Tachedelete(req: Request<{
        id: string;
    }>, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=TacheController.d.ts.map