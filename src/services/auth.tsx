'use client';

import '@/services/interceptors';

import {unentropiaApiInstance} from './instances';

const Login = async () => {
  const response = await unentropiaApiInstance.get('auth/google/url');
  const {url} = await response.data;
  window.location.href = url;
};

export default Login;
