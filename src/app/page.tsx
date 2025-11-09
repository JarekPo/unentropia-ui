'use client';
import {useEffect, useState} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {v4 as uuidv4} from 'uuid';

import Chat from '@/components/chat/Chat';

import chatLogo from '../../public/logo.png';

const Home = () => {
  const [sessionId, setSessionId] = useState<string>('');
  const newSessionId: string = uuidv4();

  useEffect(() => {
    setSessionId(newSessionId);
  }, []);

  return (
    <>
      <div className='flex flex-col items-center gap-6 p-4 sm:p-6  border min-h-screen'>
        <div className='flex justify-center w-full max-w-2xl mb-4 sticky top-0 bg-white py-2'>
          <Link href='/'>
            <Image src={chatLogo} alt='chat logo' width={200} height={undefined} loading='eager' />
          </Link>
        </div>
        <Chat sessionId={sessionId} />
      </div>
    </>
  );
};
export default Home;
