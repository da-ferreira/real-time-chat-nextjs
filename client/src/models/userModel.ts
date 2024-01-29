import { UserCreate, UserLogin } from '@/@types/users';

export const registerUser = async (user: UserCreate) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    return response.json();
  } catch (error) {
    return { message: 'Erro ao criar usuário', error };
  }
};

export const loginUser = async (user: UserLogin) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    return response.json();
  } catch (error) {
    return { message: 'Não foi possível fazer o login', error };
  }
};
