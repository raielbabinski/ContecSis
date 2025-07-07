import db from '../config/database.js';

// Função que faz inserção de um novo pedido no banco
const insertOrder = async (order) => {
  try {
    const { cliente, statped, valped, comp, altura, enderped} = order;
    const result = await db.query(
      'INSERT INTO pedido (cliente, statped, valped, comp, altura, enderped) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [cliente, statped, valped, comp, altura, enderped]
    );
    return result[0];
  } catch (error) {
    console.error('Erro ao inserir pedido:', error.message);
    throw error;
  }
};

// Função que busca todos os pedidos no banco
const getAllOrders = async () => {
  try {
    console.log('Iniciando consulta ao banco...');
    const rows = await db.query('SELECT * FROM pedido ORDER BY codped ASC');
    console.log('Consulta finalizada:', rows);
    if (!rows) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    return rows;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error.message);
    return { error: 'Erro ao buscar pedidos.' };
  }
};

// Função que busca um pedido pelo código
const getOrderById = async (codped) => {
  try {
    const result = await db.query('SELECT * FROM pedido WHERE codped = $1', [codped]);
    if (result.length === 0) {
      return { error: 'Pedido não encontrado.' };
    }
    return result[0];
  } catch (error) {
    console.error('Erro ao buscar pedido:', error.message);
    throw error;
  }
};

// Função para atualizar o pedido dinamicamente
const updateOrder = async (codped, updates) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);  
  if (fields.length === 0) {
    throw new Error('Nenhum campo para atualizar.');
  }
  const setString = fields.map((field, idx) => `${field} = $${idx + 1}`).join(', ');
  const query = `UPDATE pedido SET ${setString} WHERE codped = $${fields.length + 1} RETURNING *`;
  try {
    const result = await db.query(query, [...values, codped]);
    if (result.length === 0) {
      return { error: 'Pedido não encontrado.' };
    }
    return result[0];
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error.message);
    throw error;
  }
};

// Função que deleta um pedido pelo código
const deleteOrder = async (codped) => {
  try {
    const result = await db.query('DELETE FROM pedido WHERE codped = $1 RETURNING *', [codped]);
    if (result.length === 0) {
      return { error: 'Pedido não encontrado.' };
    }
    return result[0];
  } catch (error) {
    console.error('Erro ao deletar pedido:', error.message);
    throw error;
  }
};

export default {
  insertOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrder 
};