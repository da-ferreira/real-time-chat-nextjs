import validator from 'validator';
import userModel from '../models/user.model';
import authToken from '../config/token';

export default {
  async create(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    try {
      const exists = await userModel.findByField('email', email);

      if (exists) {
        return res.status(400).json({ message: 'Usuário já existe' });
      }

      const user = await userModel.create(name, email, password);
      const token = authToken.generateToken(user.id);

      return res.status(201).json({ token, user: { name, email } });
    } catch (error) {
      return res.status(500).json({ message: 'Não foi possível criar o usuário' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    try {
      const user = await userModel.findByField('email', email);

      if (!user) {
        return res.status(400).json({ message: 'Email ou senha inválidos' });
      }

      const validPassword = await userModel.isValidPassword(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: 'Email ou senha inválidos' });
      }

      const token = authToken.generateToken(user.id);

      return res.status(200).json({ token, user: { name: user.name, email } });
    } catch (error) {
      return res.status(500).json({ message: 'Não foi possível fazer o login' });
    }
  },

  async findById(req, res) {
    const { id } = req.params;

    try {
      const user = await userModel.findByField('id', id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Não foi possível encontrar o usuário' });
    }
  },

  async findAll(req, res) {
    const { email, name } = req.query;

    try {
      const users = await userModel.findAll(email, name);

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Não foi possível listar os usuários' });
    }
  },
};
