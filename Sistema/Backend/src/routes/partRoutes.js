import { createPart, getAllParts, updatePartByName, deletePartByName } from '../controllers/partController.js';
import { requireJWTAuth } from "../config/passport.js";
import express from 'express';

const router = express.Router()

// Rota para criar uma nova peça
router.post('/create', requireJWTAuth, createPart);

// Rota para buscar todas as peças
router.get('/getall', requireJWTAuth, getAllParts);

// Rota para atualizar uma peça pelo nome
router.put('/update/:nome', requireJWTAuth, updatePartByName);

// Rota para deletar uma peça pelo nome
router.delete('/delete/:nome', requireJWTAuth, deletePartByName);


export default router;