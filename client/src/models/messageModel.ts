export const listMessageFromChat = async (chatId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/${chatId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return response.json();
  } catch (error) {
    return { message: 'Erro ao buscar mensagens', error };
  }
};

export const sendMessageToChat = async (chatId: string, userId: string, message: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, userId, message }),
    });

    return response.json();
  } catch (error) {
    return { message: 'Erro ao enviar mensagem', error };
  }
};