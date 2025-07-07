import db from '../config/database.js'; // Importa nossa conexão

// Função que insere uma nova peça no banco
const insertPart = async (part) => {
  try {
    const { nome, preco } = part;
    const result = await db.query(
      'INSERT INTO pecas (nome, preco) VALUES ($1, $2) RETURNING *',
      [nome, preco]
    );
    return result[0];
  } catch (error) {
    console.error('Erro ao inserir peça:', error.message);
    throw error;
  }
};

// Função que busca todas as peças no banco
const getAllParts = async () => {
  try {
    console.log('Iniciando consulta ao banco...');
    const rows = await db.query('SELECT * FROM pecas ORDER BY nome ASC');
    console.log('Consulta finalizada:', rows);
    if (!rows) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    return rows;
  } catch (error) {
    console.error('Erro ao buscar peças:', error.message);
    return { error: 'Erro ao buscar peças.' };
  }
};


// Função que atualiza uma peça pelo nome
const updatePartByName = async (nome, part) => {
  try {
    const { preco } = part;
    const result = await db.query(
      'UPDATE pecas SET preco = $1 WHERE nome = $2 RETURNING *',
      [preco, nome]
    );
    if (result.length === 0) {
      return { error: 'Peça não encontrada.' };
    }
    return result[0];
  } catch (error) {
    console.error('Erro ao atualizar peça:', error.message);
    throw error;
  }
};

// Função que deleta uma peça pelo nome
const deletePartByName = async (nome) => {
  try {
    const result = await db.query('DELETE FROM pecas WHERE nome = $1 RETURNING *', [nome]);
    if (result.length === 0) {
      return { error: 'Peça não encontrada.' };
    }
    return result[0];  
    } catch (error) {
    console.error('Erro ao deletar peça:', error.message);
    throw error;
  }
};

export default {
    insertPart,
    getAllParts,
    updatePartByName,
    deletePartByName
};