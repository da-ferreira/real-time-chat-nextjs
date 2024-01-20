import validator from 'validator';
import { createUser, findByEmail, isValidPassword } from '../models/user.model';
import { generateToken } from '../auth/token';

export const create = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Email inválido' });
  }

  try {
    const exists = await findByEmail(email);

    if (exists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const user = await createUser(name, email, password);
    const token = generateToken(user.id);

    return res.status(201).json({ token, user: { name, email } });
  } catch (error) {
    return res.status(500).json({ message: 'Não foi possível criar o usuário' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos' });
  }

  try {
    const user = await findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
    }

    const validPassword = await isValidPassword(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
    }

    const token = generateToken(user.id);

    return res.status(200).json({ token, user: { name: user.name, email } });
  } catch (error) {
    return res.status(500).json({ message: 'Não foi possível fazer o login' });
  }
};
