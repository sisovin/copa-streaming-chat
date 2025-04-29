import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await api.post('/auth/register', { username, password });
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};

export const createRoom = async (roomName: string) => {
  const response = await api.post('/video-call/create-room', { roomName });
  return response.data;
};

export const joinRoom = async (roomId: string) => {
  const response = await api.post('/video-call/join-room', { roomId });
  return response.data;
};
