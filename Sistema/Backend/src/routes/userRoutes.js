import express from 'express';
import {createUser, getAllUsers} from '../controllers/userController.js';


const router = express.Router();

// router.post(
// 	"/login",
// 	passport.authenticate("local", { session: false }),
// 	(req, res) => {

// 		// Cria o token JWT
// 		const token = jwt.sign({ username: req.body.username }, "your-secret-key", {
// 			expiresIn: "1h",
// 		});

// 		res.json({ message: "Login successful", token: token });
// 	},
// );


router.post('/create', createUser);

// GET /users/getall -> Rota para buscar todos os usuários
router.get('/getall' , getAllUsers);

// Aqui você adicionaria outras rotas, como:
// router.get('/:id', getUserById);
// router.post('/', createUser);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

export default router;