import express from 'express';
import { requireJWTAuth } from '../config/passport.js';
import { createInstaller, getAllInstallers, updateInstaller, getInstallerByCpf, deleteInstaller } from '../controllers/installerController.js';


const router = express.Router();

// Rota para criar um novo cliente
router.post('/create', requireJWTAuth, createInstaller);

// Rota para listar todos os instaladores
router.get('/getall', requireJWTAuth, getAllInstallers);

// Rota para atualizar um instalador
router.put('/update/:cpf', requireJWTAuth, updateInstaller);

// Rota para buscar um instalador por CPF
router.get('/get/:cpf', requireJWTAuth, getInstallerByCpf);

// Rota para deletar um instalador
router.delete('/delete/:cpf', requireJWTAuth, deleteInstaller);

export default router;