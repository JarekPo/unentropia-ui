'use client';

// eslint-disable-next-line simple-import-sort/imports
import {useEffect, useState} from 'react';

import {AxiosResponse} from 'axios';
import {useRouter} from 'next/navigation';
import {v4 as uuidv4} from 'uuid';

import Chat from '@/components/chat/Chat';
import LoginButton from '@/components/custom/LoginButton';
import LogoutButton from '@/components/custom/LogoutButton';
import {getFirstName} from '@/lib/utils';
import '@/services/auth';
import {unentropiaApiInstance} from '@/services/instances';

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

  // obligatory login temporarily disabled
  // useEffect(() => {
  //   if (user === null && !isLoading) {
  //     router.push('/login');
  //   }
  // }, [user, router, isLoading]);

  return (
    <>
      <div className='flex flex-col items-center gap-6 p-4 sm:p-6 min-h-120'>
        {!isLoading && (
          <>
            {user ? <LogoutButton /> : <LoginButton />}
            {/* @ts-ignore */}
            Hi {getFirstName(user?.data?.name) || 'There'}!
          </>
        )}
        <Chat sessionId={sessionId} />
      </div>
    </>
  );
};
export default Home;
