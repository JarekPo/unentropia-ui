import {unentropiaApiInstance} from './instances';

export const postChatMessage = async (sessionId: string, message: string) => {
  try {
    const {data, status} = await unentropiaApiInstance.post('/chat/', {session_id: sessionId, message: message});
    return {data, status};
  } catch (error) {
    console.error('Error posting chat message:', error);
    throw error;
  }
};
