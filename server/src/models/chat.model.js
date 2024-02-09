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
    return prisma.$queryRaw`
      select c.id, c.user1Id, c.user2Id, c.lastMessage, u1.avatar as "user1Avatar", u2.avatar as "user2Avatar", u1.name as "user1Name", u2.name as "user2Name"
      from chats as c
      left join users as u1 on c.user1Id = u1.id
      left join users as u2 on c.user2Id = u2.id
      where c.user1Id = ${userId} or c.user2Id = ${userId}
    `;
  },
};
