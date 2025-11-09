import {useEffect, useRef, useState} from 'react';

import {postChatMessage} from '@/services/unentropiaServices';

import {Spinner} from '../ui/spinner';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

interface ChatProps {
  sessionId: string;
}

const Chat = ({sessionId}: ChatProps) => {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant'; content: string}>>([]);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, {role: 'user', content: message}]);
    setMessage('');
    setIsLoading(true);

    try {
      const data = await postChatMessage(sessionId, message);
      setMessages((prev) => [...prev, {role: 'assistant', content: data.data.response}]);
    } catch (error) {
      setMessages((prev) => [...prev, {role: 'assistant', content: 'Error retrieving response.'}]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='flex flex-col w-full max-w-2xl flex-grow overflow-y-auto gap-3 p-2 rounded-md'>
        {messages.map((msg, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ChatMessage key={index} role={msg.role} content={msg.content} /> // use DB message id when table storage is implemented
        ))}
        {isLoading && <Spinner className='size-6' />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput message={message} setMessage={setMessage} onSend={sendMessage} isLoading={isLoading} />
    </>
  );
};

export default Chat;
