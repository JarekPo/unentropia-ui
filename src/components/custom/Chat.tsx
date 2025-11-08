import {useEffect, useRef, useState} from 'react';

import {postChatMessage} from '@/services/unentropiaServices';

import {Button} from '../ui/button';
import {Spinner} from '../ui/spinner';
import Textarea from '../ui/textarea';

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
    const data = await postChatMessage(sessionId, message);
    setMessages((prev) => [...prev, {role: 'assistant', content: data.data.response}]);
    setIsLoading(false);
  };
  return (
    <>
      <div className='flex flex-col w-full max-w-2xl flex-grow overflow-y-auto gap-3 p-2 rounded-md'>
        {messages.map((msg, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index} // use DB message id when table storage is implemented
            className={`p-3 rounded-md  overflow-wrap break-words whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-blue-100 self-end text-left max-w-[85%]'
                : 'bg-gray-200 self-start text-left max-w-[95%]'
            }`}
          >
            {msg.role === 'assistant' ? (
              <>
                <span className='whitespace-pre-wrap font-medium text-sm capitalize'>{msg.role}:</span>
                <br />
              </>
            ) : null}
            {msg.content}
          </div>
        ))}
        {isLoading && <Spinner className='size-6' />}
        <div ref={messagesEndRef} />
      </div>
      <div className='flex flex-col w-full max-w-2xl p-2 border rounded-md'>
        <Textarea
          placeholder='Ask me anything...'
          id='message'
          className='w-full resize-y overflow-auto'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <div className='flex justify-end mt-2'>
          <Button variant='outline' onClick={sendMessage} className='w-full sm:w-auto'>
            Send Message
          </Button>
        </div>
      </div>
    </>
  );
};

export default Chat;
