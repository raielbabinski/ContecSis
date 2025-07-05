import e from 'express';
import db from '../config/database.js'; 

// Função para cadastrar um novo seviço no banco de dados
const insertService = async (service) => {
  try {
    const { inst, valserv, tipserv, dtserv } = service;
    console.log('Inserindo serviço:', service);
    const result = await db.query(
      'INSERT INTO servico (inst, nome, descricao, preco) VALUES ($1, $2, $3, $4) RETURNING *',
      [ inst, valserv, tipserv, dtserv ]
    );
    return result[0];
  } catch (error) {
    console.error('Erro ao inserir serviço:', error.message);
    throw error;
  }
}

export default {
  insertService,
}