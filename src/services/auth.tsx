import {unentropiaApiInstance} from './instances';

unentropiaApiInstance.interceptors.request.use((config) => {
  const crf = document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1];
  if (crf && config.headers) {
    config.headers['X-CSRFToken'] = crf;
  }
  return config;
});

unentropiaApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await unentropiaApiInstance.post('/auth/refresh');
      return unentropiaApiInstance(error.config);
    }
    return Promise.reject(error);
  }
);

const Login = async () => {
  const response = await unentropiaApiInstance.get('auth/google/url');
  const {url} = await response.data;
  window.location.href = url;
};

export default Login;
