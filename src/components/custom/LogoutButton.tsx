'use client';

import {Button} from '@/components/ui/button';
import {unentropiaApiInstance} from '@/services/instances';

export const logout = async () => {
  await unentropiaApiInstance.post('auth/google/logout');
  window.location.href = '/login';
};

const LogoutButton = () => {
  return (
    <Button variant='outline' onClick={logout} className='w-full sm:w-auto cursor-pointer'>
      Logout
    </Button>
  );
};

export default LogoutButton;
