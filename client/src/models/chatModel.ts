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