import { prisma } from '../config/prisma.client.js';
import bcrypt from 'bcrypt';

export default {
  async create(name, email, password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return prisma.user.create({
      data: { name, email, password: hash },
    });
  },

  async findByField(field, value, select = null) {
    return prisma.user.findUnique({
      where: { [field]: value },
      select: select ? select : { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
  },

  async isValidPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  },

  async findAll(email, name) {
    return prisma.user.findMany({
      where: {
        email: { contains: email || '' },
        name: { contains: name || '' },
      },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
  },
};
