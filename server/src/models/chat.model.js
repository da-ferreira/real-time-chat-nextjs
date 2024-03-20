import { v4 as uuidv4 } from 'uuid';
import { db } from '../config/database.js';

export default {
  async create(user1Id, user2Id) {
    const chat = await db('chats').insert({ id: uuidv4(), user1Id, user2Id, lastMessage: null });

    return this.find(user1Id, user2Id);
  },

  async find(user1Id, user2Id) {
    return db('chats as c')
      .select('c.id', 'c.user1Id', 'c.user2Id', 'c.lastMessage', 'u1.avatar as user1Avatar', 'u2.avatar as user2Avatar', 'u1.name as user1Name', 'u2.name as user2Name')
      .leftJoin('users as u1', 'c.user1Id', 'u1.id')
      .leftJoin('users as u2', 'c.user2Id', 'u2.id')
      .where(function () {
        this.where('c.user1Id', user1Id).andWhere('c.user2Id', user2Id);
      })
      .orWhere(function () {
        this.where('c.user1Id', user2Id).andWhere('c.user2Id', user1Id);
      })
      .first();
  },

  async findByUser(userId) {
    return db('chats as c')
      .select('c.id', 'c.user1Id', 'c.user2Id', 'c.lastMessage', 'u1.avatar as user1Avatar', 'u2.avatar as user2Avatar', 'u1.name as user1Name', 'u2.name as user2Name')
      .leftJoin('users as u1', 'c.user1Id', 'u1.id')
      .leftJoin('users as u2', 'c.user2Id', 'u2.id')
      .where('c.user1Id', userId)
      .orWhere('c.user2Id', userId);
  },
};
