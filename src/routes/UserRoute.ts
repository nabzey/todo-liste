
import Router from 'express';
import { UserController } from '../controllers/UserController';
const cont = new UserController();
const router = Router();


router.get('/',cont.getAll)
router.post('/',cont.createUser)
router.post('/auth',cont.login)
router.get('/refresh',cont.tokenrefresh)
export default router;