import partsModel from '../model/partsModel.js';

// Função para inserir uma nova peça
export const createPart = async (req, res) => {
  try {
    const part = req.body;
    const newPart = await partsModel.insertPart(part);
    res.status(201).json(newPart);
  } catch (error) {
    console.error('Erro ao inserir peça:', error.message);
    res.status(500).json({ error: 'Erro ao inserir peça.' });
  }
}

// Função para buscar todas as peças
export const getAllParts = async (req, res) => {
  try {
    const parts = await partsModel.getAllParts();
    res.status(200).json(parts);
  } catch (error) {
    console.error('Erro ao buscar peças:', error.message);
    res.status(500).json({ error: 'Erro ao buscar peças.' });
  }
}

// Função para buscar uma peça pelo nome
export const getPartByName = async (req, res) => {
  try {
    const { nome } = req.params;
    const part = await partsModel.getPartByName(nome);
    if (part.error) {
      return res.status(404).json({ error: part.error });
    }
    res.status(200).json(part);
  } catch (error) {
    console.error('Erro ao buscar peça:', error.message);
    res.status(500).json({ error: 'Erro ao buscar peça.' });
  }
}

// Função para atualizar uma peça pelo nome
export const updatePartByName = async (req, res) => {
  try {
    const { nome } = req.params;
    const part = req.body;
    const updatedPart = await partsModel.updatePartByName(nome, part);
    if (updatedPart.error) {
      return res.status(404).json({ error: updatedPart.error });
    }
    res.status(200).json(updatedPart);
  } catch (error) {
    console.error('Erro ao atualizar peça:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar peça.' });
  }
}

export const deletePartByName = async (req, res) => {
  try {
    const { nome } = req.params;
    const deletedPart = await partsModel.deletePartByName(nome);
    if (deletedPart.error) {
      return res.status(404).json({ error: deletedPart.error });
    }
    res.status(200).json(deletedPart);
  } catch (error) {
    console.error('Erro ao deletar peça:', error.message);
    res.status(500).json({ error: 'Erro ao deletar peça.' });
  }
}