'use client';

import {Button} from '@/components/ui/button';
import {unentropiaApiInstance} from '@/services/instances';
const login = async () => {
  const response = await unentropiaApiInstance.get('auth/google/url');
  const {url} = await response.data;
  window.location.href = url;
};

export const logout = async () => {
  await unentropiaApiInstance.post('auth/google/logout');
  window.location.href = '/login';
};

const LoginPage = () => {
  return (
    <>
      <Button variant='outline' onClick={login} className='w-full sm:w-auto'>
        Login with Google
      </Button>
      <Button variant='outline' onClick={logout} className='w-full sm:w-auto'>
        Logout
      </Button>
    </>
  );
};

export default LoginPage;
