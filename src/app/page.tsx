'use client';
import {useEffect, useRef, useState} from 'react';

import {v4 as uuidv4} from 'uuid';

import {Button} from '@/components/ui/button';
import Textarea from '@/components/ui/textarea';
import {postChatMessage} from '@/services/unentropiaServices';

const Home = () => {
  const [sessionId, setSessionId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const newSessionId = uuidv4();

  useEffect(() => {
    setSessionId(newSessionId);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const data = await postChatMessage(sessionId, message);

    setMessages((prev) => [
      ...prev,
      {role: 'user', content: message},
      {role: 'assistant', content: data.data.response},
    ]);

    setMessage('');
  };
  return (
    <>
      <div className='flex flex-col items-center gap-6 p-4 sm:p-6 border min-h-screen'>
        <h1 className='text-xl sm:text-2xl font-bold'>Unentropia</h1>
        <div className='flex flex-col w-full max-w-2xl flex-grow overflow-y-auto gap-3 p-2 border rounded-md'>
          {messages.map((msg, index) => (
            <div
              key={index} // use DB message id when table storage is implemented
              className={`p-3 rounded-md max-w-[85%] ${
                msg.role === 'user' ? 'bg-blue-100 self-end text-right' : 'bg-gray-200 self-start text-left'
              }`}
            >
              {msg.content}
            </div>
          ))}
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
      </div>
    </>
  );
};
export default Home;
