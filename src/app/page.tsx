'use client';
import {useEffect, useState} from 'react';

import {v4 as uuidv4} from 'uuid';

import {Button} from '@/components/ui/button';
import Textarea from '@/components/ui/textarea';
import {postChatMessage} from '@/services/unentropiaServices';

const Home = () => {
  const [sessionId, setSessionId] = useState('');
  const [message, setMessage] = useState('');
  const newSessionId = uuidv4();

  useEffect(() => {
    setSessionId(newSessionId);
  }, []);

  const sendMessage = async () => {
    const data = await postChatMessage(sessionId, message);
    setMessage('');
    console.log(data.data.response);
  };
  return (
    <>
      <div className='flex flex-col items-center gap-6 p-4 sm:p-6 border min-h-screen'>
        <h1 className='text-xl sm:text-2xl font-bold'>Unentropia</h1>
        <div className='flex flex-col w-full max-w-2xl m-auto max-h-[35rem] rounded-md p-2 border flex-grow h-full justify-end'>
          <div className='flex flex-col flex-grow justify-end h-full'>
            <Textarea
              placeholder='Ask me anything...'
              id='message'
              className='w-full h-50 max-h-120 resize-y overflow-auto'
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <div className='flex flex-col sm:flex-row justify-end mt-2 gap-2'>
              <div className='sm:flex-1' />
              <Button variant='outline' aria-label='Send message' onClick={sendMessage} className='w-full sm:w-auto'>
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
