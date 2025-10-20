//Controla as rotas

import { Router } from 'express';
import * as bruxoController from '../controllers/bruxoController.js';

const router = Router();

router.get('/bruxos', bruxoController.ListarTodos);
routes.get('/bruxos/:id', bruxoController.listarUm);

export default router;