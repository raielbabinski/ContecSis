import orderModel from "../model/orderModel.js";
import addressModel from "../model/addressModel.js";
import orderItemModel from "../model/orderItemModel.js";

/* * Controlador para gerenciar pedidos
{
    cliente : cpf,
    statped : status do pedido,
    valped : valor do pedido,
    comp : comprimento do pedido,
    altura : altura do pedido,
    enderped : {
        cep : cep do pedido,
        logradouro : logradouro do pedido,
        numero : numero do pedido,
        bairro : bairro do pedido,
        cidade : cidade do pedido,
        uf : uf do pedido
    }
    pecas : [{
            nome : id da peça,
            quantidade : quantidade da peça,
        },
        {        
            nome : id da peça,
            quantidade : quantidade da peça,
        },
        ...
    ]
};
 */


// Função para inserir um novo pedido
export const createOrder = async (req, res) => {
  try {
    const { cliente, statped, valped, comp, altura, enderped, pecas } = req.body;
    
    const newAddress = await addressModel.insertAddress(enderped);

    const order = {
      cliente,
      statped,
      valped,
      comp,
      altura,
      enderped: newAddress.endercod, // Endereço inserido no banco
    };

    const newOrder = await orderModel.insertOrder(order);

    for (const item of pecas) {
      const orderItem = {
        codped: newOrder.codped, // Código do pedido recém-criado
        codpeca: item.id, // ID da peça
        quantidade: item.quantidade, // Quantidade da peça
      };
      await orderItemModel.insertOrderItem(orderItem);
    }

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Erro ao inserir pedido:', error.message);
 
    res.status(500).json({ error: 'Erro ao inserir pedido.' });
  }
}

export const getOrderById = async (req, res) => {
  try {
    const { codped } = req.params;
    const order = await orderModel.getOrderById(codped);
    if (order.error) {
      return res.status(404).json({ error: order.error });  
    }
    const orderItems = await orderItemModel.getOrderItemsByOrderId(codped);
    if (orderItems.error) {
      return res.status(404).json({ error: orderItems.error });
    }
    order.pecas = orderItems; // Adiciona os itens do pedido ao objeto
    res.status(200).json(order);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error.message);
    res.status(500).json({ error: 'Erro ao buscar pedido.' });
  }
}

// Função para buscar todos os pedidos
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    if (orders.error) {
      return res.status(404).json({ error: orders.error });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error.message);
    res.status(500).json({ error: 'Erro ao buscar pedidos.' });
  }
}

// Função para deletar um pedido
export const deleteOrder = async (req, res) => {
  try {
    const { codped } = req.params;
    // Deletar os itens do pedido antes de deletar o pedido
    const deletedItems = await orderItemModel.deleteOrderItem(codped);
    if (deletedItems.error) {
      return res.status(404).json({ error: deletedItems.error });
    }
    // Deletar o pedido 
    
    const deletedOrder = await orderModel.deleteOrder(codped);
    if (deletedOrder.error) {
      return res.status(404).json({ error: deletedOrder.error });
    }
    res.status(200).json(deletedOrder);
  } catch (error) {
    console.error('Erro ao deletar pedido:', error.message);
    res.status(500).json({ error: 'Erro ao deletar pedido.' });
  }
}

// Função para atualizar um pedido
export const updateOrder = async (req, res) => {
  try {
    const { codped } = req.params;
    const updates = req.body;
    const endereçoAntigo = null;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Nenhum campo para atualizar.' });
    }

    // Atualizar endereço, se necessário
    if (updates.enderped && typeof updates.enderped === 'object' && Object.keys(updates.enderped).length > 0) {
      // armazenar o endereço antigo
      
      
      const order = await orderModel.getOrderById(codped);
      if (!order) {
        return res.status(404).json({ message: 'Pedido não encontrado.' });
      }

      const endereçoAntigo = order.enderped;

      const updatedAddress = await addressModel.updateAddress(order.enderped, updates.enderped);
      if (updatedAddress.error) {
        return res.status(404).json({ error: updatedAddress.error });
      }
      updates.enderped = updatedAddress.endercod;
    }

    // Atualizar peças do pedido de forma incremental
    if (updates.peca && Array.isArray(updates.peca)) {
      // Busca peças já existentes no pedido
      const existingItems = await orderItemModel.getOrderItemsByOrder(codped);
      if (existingItems.error) {
        return res.status(404).json({ error: existingItems.error });
      }

      console.log(existingItems, "\n", updates.peca)

      // Atualiza quantidade das peças que já existem
        for (const item of updates.peca) {
            const existingItem = existingItems.find(i => i.peca === item.id.toString());
            
            if (existingItem) {
            await orderItemModel.updateOrderItemQuantity(codped, item.id, item.quantidade);
            } else {

            const newOrderItem = {
                pedido: codped,
                peca: item.id,
                quantidade: item.quantidade,
            };
            await orderItemModel.insertOrderItem(newOrderItem);
            }
        }
    }
    // Retira peca do update
    delete updates.peca;
    const updatedOrder = await orderModel.updateOrder(codped, updates);
    if (updatedOrder.error) {
      return res.status(404).json({ error: updatedOrder.error });
    }

    // deleta o endereço antigo se ele foi atualizado
    if (endereçoAntigo && endereçoAntigo !== updatedAddress.endercod) {
      const deletedAddress = await addressModel.deleteAddress(endereçoAntigo);
      if (deletedAddress.error) {
        return res.status(404).json({ error: deletedAddress.error });
      }
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar pedido.' });
  }
};
