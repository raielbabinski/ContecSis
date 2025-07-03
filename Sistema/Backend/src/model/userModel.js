import db from '../config/database.js'; // Importa nossa conexão

// Função que busca todas as tarefas no banco
// src/model/userModel.js
const usersAll = async () => {
  try {
    console.log('Iniciando consulta ao banco...');
    const rows = await db.query('SELECT * FROM usuario ORDER BY codusuario ASC');
    console.log('Consulta finalizada:', rows);
    if (!rows) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    return rows;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.message);
    return { error: 'Erro ao buscar usuários.' };
  }
};

const insertUser = async (user) => {
  try {
    const { nome, senha, email, telefone, cargo } = user;
    const result = await db.query(
      'INSERT INTO usuario (nome, senha, email, telefone, cargo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, senha, email, telefone, cargo]
    );
    return result[0];
  } catch (error) {
    console.error('Erro ao inserir usuário:', error.message);
    throw error;
  }
};

export default {
  usersAll,
  insertUser
};