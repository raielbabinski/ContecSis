import express from 'express';
import {createUser, getAllUsers, login} from '../controllers/userController.js';
import passport from '../config/passport.js';

const router = express.Router();

router.post('/login', login);


router.post('/create', createUser);

// GET /users/getall -> Rota para buscar todos os usuários
router.get('/getall' , getAllUsers);

// Aqui você adicionaria outras rotas, como:
// router.get('/:id', getUserById);
// router.post('/', createUser);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

export default router;