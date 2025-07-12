import { createOrder, getAllOrders, deleteOrder, updateOrder, getOrderById } from '../controllers/orderController.js';
import express from 'express';
import { requireJWTAuth } from '../config/passport.js';


const router = express.Router();

// Rota para criar um novo pedido
router.post('/create', requireJWTAuth, createOrder);

// Rota para buscar todos os pedidos
router.get('/getall', requireJWTAuth, getAllOrders);    

// Rota para deletar um pedido pelo código
router.delete('/delete/:codped', requireJWTAuth, deleteOrder);  

// Rota para buscar um pedido pelo código
router.get('/get/:codped', requireJWTAuth, getOrderById);

// Rota para atualizar um pedido
router.put('/update/:codped', requireJWTAuth, updateOrder);
export default router;