import messageModel from '../models/message.model';

export default {
  async find(req, res) {
    const { chatId } = req.params;

    try {
      const messages = await messageModel.findByChat(chatId);

      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json({ message: 'Não foi possível buscar as mensagens' });
    }
  },

  async create(req, res) {
    const { chatId, userId, message } = req.body;

    try {
      const newMessage = await messageModel.create(chatId, userId, message);

      return res.status(201).json(newMessage);
    } catch (error) {
      return res.status(500).json({ message: 'Não foi possível criar a mensagem' });
    }
  },
};
