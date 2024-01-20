import { prisma } from '../prisma/client';
import bcrypt from 'bcrypt';

export const findByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (name, email, password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return prisma.user.create({
    data: { name, email, password: hash },
  });
};

export const isValidPassword = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
