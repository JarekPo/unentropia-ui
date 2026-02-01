'use client';
import {useEffect, useState} from 'react';

import {AxiosResponse} from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {v4 as uuidv4} from 'uuid';

import Chat from '@/components/chat/Chat';
import {unentropiaApiInstance} from '@/services/instances';

import chatLogo from '../../public/logo.png';

const Home = () => {
  const [sessionId, setSessionId] = useState<string>('');
  const [user, setUser] = useState<AxiosResponse<object> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const newSessionId: string = uuidv4();
    setSessionId(newSessionId);
    const fetchUser = async () => {
      try {
        const response = await unentropiaApiInstance.get('/auth/google/me');
        setUser(response || null);
        setIsLoading(false);
      } catch (error) {
        setUser(null);
        setIsLoading(false);
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user === null && !isLoading) {
      router.push('/login');
    }
  }, [user, router, isLoading]);

  return (
    <>
      {!isLoading && (
        <div className='flex flex-col items-center gap-6 p-4 sm:p-6  border min-h-screen'>
          <div className='flex justify-center w-full max-w-2xl mb-4 sticky top-0 bg-white py-2'>
            <Link href='/'>
              <Image src={chatLogo} alt='chat logo' width={200} height={undefined} loading='eager' />
            </Link>
          </div>
          {/* @ts-ignore */}
          <>Hi {user?.data?.name}</>
          <Chat sessionId={sessionId} />
        </div>
      )}
    </>
  );
};
export default Home;
