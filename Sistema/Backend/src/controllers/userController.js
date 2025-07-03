// Agora importamos do repositório, e não temos mais o array de tarefas aqui!
import userModel from '../model/userModel.js';
import passport, { requireJWTAuth } from '../config/passport.js';
import bcrypt from 'bcrypt';


// Função para buscar todas as tarefas (GET)
export const getAllUsers = async (req, res) => {
  try {
    console.log('Buscando todos os usuários...');
    const users = await userModel.usersAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export const  createUser = async (req, res) => {
    try {
        const user = req.body;
        console.log('Criando usuário:', user);
        const userIncripted = {
            nome : user.nome,
            senha : await bcrypt.hash(user.senha, 10),
            email : user.email,
            telefone : user.telefone, 
            cargo : user.cargo
        };

        console.log('Usuário incriptado:', userIncripted);
        const newUser = await userModel.insertUser(userIncripted);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
};