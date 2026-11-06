import { Router } from 'express';
import {
    getTasks,
    createTask,
    deleteTask
} from '../controllers/taskController';
import { verificarToken } from '../middlewares/authMiddleware';

const router = Router();

router.use(verificarToken);

router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);

export default router;