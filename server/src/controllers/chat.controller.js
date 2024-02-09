import chatModel from '../models/chat.model';

export default {
  async create(req, res) {
    const { user1Id, user2Id } = req.body;

    try {
      const chat = await chatModel.find(user1Id, user2Id);

      if (chat) {
        return res.status(200).json(chat);
      }

      const newChat = await chatModel.create(user1Id, user2Id);

      return res.status(201).json(newChat);
    } catch (error) {
      return res.status(500).json({ message: 'Não foi possível criar o chat' });
    }
  },

  async find(req, res) {
    const { userId } = req.params;

    try {
      const chats = await chatModel.findByUser(userId);

      return res.status(200).json(chats);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Não foi possível buscar os chats do usuário' });
    }
  },
};
