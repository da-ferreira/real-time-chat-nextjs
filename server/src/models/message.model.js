import { v4 as uuidv4 } from 'uuid';
import { db } from '../config/database.js';

export default {
  async findByChat(chatId) {
    return db('messages').where('chatId', chatId).orderBy('createdAt', 'asc');
  },

  async create(chatId, userId, message) {
    const uuid = uuidv4();

    await db('messages').insert({ id: uuid, chatId, userId, message });

    await db('chats').where('id', chatId).update({ lastMessage: message });

    return db('messages').where('chatId', chatId).orderBy('createdAt', 'desc').first();
  },
};
