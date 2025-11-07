'use client';
import {useEffect, useRef, useState} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {v4 as uuidv4} from 'uuid';

import {Button} from '@/components/ui/button';
import {Spinner} from '@/components/ui/spinner';
import Textarea from '@/components/ui/textarea';
import {postChatMessage} from '@/services/unentropiaServices';

import chatLogo from '../../public/logo.png';

const Home = () => {
  const [sessionId, setSessionId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setMessages((prev) => [...prev, {role: 'user', content: message}]);
    setMessage('');
    setIsLoading(true);
    const data = await postChatMessage(sessionId, message);
    setMessages((prev) => [...prev, {role: 'assistant', content: data.data.response}]);
    setIsLoading(false);
  };
  return (
    <>
      <div className='flex flex-col items-center gap-6 p-4 sm:p-6 border min-h-screen'>
        <Link href='/'>
          <Image src={chatLogo} alt='chat logo' width={200} height={undefined} loading='eager' />
        </Link>
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
      </div>
    </>
  );
};
export default Home;
