

import express from 'express';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// Define as rotas para o recurso "tarefas"
// Ex: http://localhost:3001/api/tarefas

// GET /api/tarefas -> Rota para buscar todas as tarefas
router.get('/getall', getAllUsers);

// POST /api/tarefas -> Rota para criar uma nova tarefa

// Aqui você adicionaria outras rotas, como:
// router.get('/tarefas/:id', getTarefaById);
// router.put('/tarefas/:id', updateTarefa);
// router.delete('/tarefas/:id', deleteTarefa);

export default router;