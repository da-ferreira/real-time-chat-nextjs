import { prisma } from '../config/prisma.client.js';

export default {
  async create(user1Id, user2Id) {
    return prisma.chat.create({
      data: { user1Id, user2Id, lastMessage: null },
    });
  },

  async find(user1Id, user2Id) {
    return prisma.chat.findFirst({
      where: {
        OR: [
          { user1Id, user2Id },
          { user1Id: user2Id, user2Id: user1Id },
        ],
      },
    });
  },

  async findByUser(userId) {
    return prisma.chat.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
    });
  },
};
