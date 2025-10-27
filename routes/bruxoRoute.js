//Controla as rotas

import { Router } from 'express';
import * as bruxoController from '../controllers/bruxoController.js';

const router = Router();

router.get('/', bruxoController.ListarTodos);
router.get('/:id', bruxoController.listarUm);
router.delete('/:id', bruxoController.deletar);

export default router;