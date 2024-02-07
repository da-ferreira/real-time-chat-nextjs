import { prisma } from '../config/prisma.client.js';
import bcrypt from 'bcrypt';

export default {
  async create(name, email, password, avatar) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return prisma.user.create({
      data: { name, email, password: hash, avatar },
    });
  },

  async findByField(field, value, select = null) {
    return prisma.user.findUnique({
      where: { [field]: value },
      select: select ? select : { id: true, name: true, email: true, createdAt: true, updatedAt: true, avatar: true },
    });
  },

  async isValidPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  },

  async findAll(search) {
    return prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: search || '' } },
          { name: { contains: search || '' } },
        ],
      },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
  },
};
