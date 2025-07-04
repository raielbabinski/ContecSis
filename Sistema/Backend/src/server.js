import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from './config/database.js';

import userRoutes from './routes/userRoutes.js';
import cliente from './routes/clientesRoutes.js';
// Importe outras rotas conforme necessário
// import pedidosRoutes from './routes/pedidosRoutes.js';
// import clientesRoutes from './routes/clientesRoutes.js';

const app = express();
const PORT = 3012; // A porta onde a API vai rodar

app.use(express.json());
app.use(cors());

// Rotas principais
app.use('/user', userRoutes);
// app.use('/pedidos', pedidosRoutes);
app.use('/cliente', cliente);

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});

