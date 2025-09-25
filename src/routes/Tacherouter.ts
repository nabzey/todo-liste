import Router from 'express';
import { TacheController} from '../controllers/TacheController';
import {PerMiddleware} from '../middlewares/PerMiddleware'
import upload from '../uploader';

const cont = new TacheController();
const router = Router();

router.get('/',cont.getAll);
router.post('/', upload.single('photo'), cont.create);
router.get('/:id',cont.getOne);
router.put('/:id', upload.single('photo'), PerMiddleware.permi, cont.updateOne)
router.delete('/:id',PerMiddleware.permi,cont.Tachedelete)
export default router;
