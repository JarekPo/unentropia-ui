export type User = {
  data: {
    avatar: string;
    email: string;
    id: number | string;
    name: string;
  };
  request: XMLHttpRequest;
  status: number;
  statusText: string;
  headers: object;
  config: object;
} | null;
