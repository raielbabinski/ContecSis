import e from 'express';
import db from '../config/database.js';
import { updateOrder } from '../controllers/orderController.js';

// Função que insere uma nova relação entre pedido e item no banco
const insertOrderItem = async (orderItem) => {
  try {
    const { codped, codpeca, quantidade } = orderItem;
    const result = await db.query(
      'INSERT INTO itempedido (pedido, peca, qtd) VALUES ($1, $2, $3) RETURNING *',
      [codped, codpeca, quantidade]
    );
    return result[0];
  } catch (error) {
    console.error('Erro ao inserir item do pedido:', error.message);
    throw error;
  }
}

// Função que deleta um item pelo codigo do pedido
const deleteOrderItem = async (codped) => {
  try {
    const result = await db.query('DELETE FROM itempedido WHERE pedido = $1 RETURNING *', [codped]);
    if (result.length === 0) {
      return { error: 'Item do pedido não encontrado.' };
    }
    return result[0];
  } catch (error) { 
    console.error('Erro ao deletar item do pedido:', error.message);
    throw error;
  }
}

const getOrderItemsByOrder = async (codped) => {
  try {
    const result = await db.query('SELECT * FROM itempedido WHERE pedido = $1', [codped]);
    if (result.length === 0) {
      return { error: 'Nenhum item encontrado para este pedido.' };
    }
    return result;
  } catch (error) {
    console.error('Erro ao buscar itens do pedido:', error.message);
    throw error;
  }
}

const updateOrderItemQuantity = async (codped, codpeca, quantidade) => {
  try {
    const result = await db.query(
      'UPDATE itempedido SET qtd = $1 WHERE pedido = $2 AND peca = $3 RETURNING *',
      [quantidade, codped, codpeca]
    );
    return result[0];
  } catch (error) {
    console.error('Erro ao atualizar quantidade do item do pedido:', error.message);
    throw error;
  }
}

export default {
  insertOrderItem,
  deleteOrderItem,
  getOrderItemsByOrder,
  updateOrderItemQuantity
};