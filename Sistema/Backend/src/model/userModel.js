import db from '../config/database.js'; // Importa nossa conexão

// Função que busca todas as tarefas no banco
const usersAll = async () => {
  try {
    const rows = await db.query('SELECT * FROM usuario ORDER BY codusuario ASC');
    if (!rows) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.message);
    return { error: 'Erro ao buscar usuários.' };
  }
};


export default {
  usersAll
};