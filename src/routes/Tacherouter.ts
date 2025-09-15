
import Router from 'express';
import { TacheController} from '../controllers/TacheController';
import {PerMiddleware} from '../middlewares/PerMiddleware'

const cont = new TacheController();
const router = Router();

router.get('/',cont.getAll);
router.post('/',cont.create);
router.get('/:id',cont.getOne);
router.put('/:id',PerMiddleware.permi,cont.updateOne)
router.delete('/:id',PerMiddleware.permi,cont.Tachedelete)
export default router;
