
export const listUserChats = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return response.json();
  } catch (error) {
    return { message: 'Erro ao buscar chats', error };
  }
};

export const createOrGetChat = async (user1Id: string, user2Id: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user1Id, user2Id }),
    });

    return response.json();
  } catch (error) {
    return { message: 'Erro ao criar chat', error };
  }
};