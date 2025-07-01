// Agora importamos do repositório, e não temos mais o array de tarefas aqui!
import userModel from '../model/userModel.js';

// Função para buscar todas as tarefas (GET)
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.usersAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};
