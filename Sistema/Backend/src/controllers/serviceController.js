import serviceModel from "../model/serviceModel";

// Função para inserir um novo serviço
export const createService = async (req, res) => {
  try {
    const service = req.body;
    console.log('Criando serviço:', service);
    const newService = await serviceModel.insertService(service);
    res.status(201).json(newService);
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}