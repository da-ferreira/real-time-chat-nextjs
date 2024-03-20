import { db } from '../config/database.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default {
  async create(name, email, password, avatar) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const uuid = uuidv4();

    return db('users').insert({ id: uuid, name, email, password: hash, avatar });
  },

  async findByField(field, value, select = null) {
    return db('users').where(field, value).select(select).first();
  },

  async isValidPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  },

  async findAll(search) {
    return db('users').where('email', 'like', `%${search || ''}%`).orWhere('name', 'like', `%${search || ''}%`);
  },
};
