
import express from 'express';
import { createClient, getAllClients, updateClient, getClientByCpf } from '../controllers/clientController.js';
import { requireJWTAuth } from '../config/passport.js';

const router = express.Router();

// Rota para criar um novo cliente
router.post('/create', requireJWTAuth,  createClient);

// Rota para listar todos os clientes
router.get('/getall', requireJWTAuth, getAllClients);

// Rota para buscar um cliente por CPF
router.get('/get/:cpf', requireJWTAuth, getClientByCpf);

// Rota para atualizar um cliente
router.put('/update/:cpf', requireJWTAuth, updateClient);



export default router;