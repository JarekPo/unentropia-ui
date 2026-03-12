import {unentropiaApiInstance} from './instances';

export const postChatMessage = async (sessionId: string, message: string, userId: string | number | null) => {
  try {
    const {data, status} = await unentropiaApiInstance.post('/api/v1/chat/', {
      session_id: sessionId,
      message: message,
      user_id: userId,
    });
    return {data, status};
  } catch (error) {
    console.error('Error posting chat message:', error);
    throw error;
  }
};
