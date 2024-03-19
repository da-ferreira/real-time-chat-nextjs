import { prisma } from '../config/prisma.client.js';
import { v4 as uuidv4 } from 'uuid';

export default {
  async findByChat(chatId) {
    return prisma.$queryRaw`SELECT * FROM messages WHERE chatId = ${chatId} ORDER BY createdAt ASC`;
  },

  async create(chatId, userId, message) {
    const uuid = uuidv4();

    await prisma.$queryRaw`INSERT INTO messages (id, chatId, userId, message) VALUES (${uuid}, ${chatId}, ${userId}, ${message})`;
    await prisma.$queryRaw`UPDATE chats SET lastMessage = ${message} WHERE id = ${chatId}`;
    return prisma.$queryRaw`SELECT * FROM messages WHERE chatId = ${chatId} ORDER BY createdAt DESC LIMIT 1`;
  },
};
