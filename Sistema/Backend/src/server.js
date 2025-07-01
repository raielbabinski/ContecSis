import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import pedidosRoutes from './routes/pedidosRoutes.js';
import clientesRoutes from './routes/clientesRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001; // A porta onde a API vai rodar

// 3. Middlewares (Recursos que rodam em toda requisição)
app.use(cors()); // Habilita o CORS para que seu frontend React possa acessar a API
app.use(express.json()); // Permite que o servidor entenda requisições com corpo em JSON

// 4. Rotas da API
// Qualquer requisição que começar com /api será direcionada para nossas rotas
app.use('/api/users', userRoutes);
//app.use('/api/pedidos', pedidosRoutes);
//app.use('/api/clientes', clientesRoutes);

// Rota Inicial
app.get('/', (req, res) => {
  res.send('<h1>Bem-vindo à API do nosso projeto!</h1>');
});

// Inicia o Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});