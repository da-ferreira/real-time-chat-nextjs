import { prisma } from '../config/prisma.client.js';

export default {
  async findByChat(chatId) {
    return prisma.message.findMany({ where: { chatId } });
  },

  async create(chatId, userId, message) {
    const newMessage = await prisma.message.create({ data: { chatId, userId, message } });

    await prisma.chat.update({
      where: { id: chatId },
      data: { lastMessage: message },
    });

    return newMessage;
  },
};
