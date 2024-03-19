import { prisma } from '../config/prisma.client.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default {
  async create(name, email, password, avatar) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const uuid = uuidv4();

    return prisma.$queryRaw`INSERT INTO users (id, name, email, password, avatar) VALUES (${uuid}, ${name}, ${email}, ${hash}, ${avatar})`;
  },

  async findByField(field, value, select = null) {
    // console.log('field', email);
    if (field === 'id') {
      const user = await prisma.$queryRaw`SELECT * FROM users WHERE id = ${value}`;
      return user[0];
    }

    // await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
    // const user = await prisma.$queryRawUnsafe`SELECT * FROM users WHERE email = ${value}`;
    const user = await prisma.$queryRawUnsafe(`SELECT * FROM users WHERE email = $1`, value);
    return user[0];
  },

  async isValidPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  },

  async findAll(search) {
    return prisma.$queryRaw`SELECT * FROM users WHERE email LIKE '%${search || ''}%' OR name LIKE '%${search || ''}%'`;
  },
};
