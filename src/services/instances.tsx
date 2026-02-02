import axios from 'axios';

const unentropiaBaseURL = process.env.NEXT_PUBLIC_UNENTROPIA_API_URL;

export const unentropiaApiInstance = axios.create({
  baseURL: unentropiaBaseURL,
  withCredentials: true,
});
