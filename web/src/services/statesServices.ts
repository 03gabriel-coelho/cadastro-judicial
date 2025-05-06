import axios from 'axios';
import { State } from 'document/types/processTypes';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getStates = async (): Promise<State[]> => {
  const response = await api.get('/api/states');
  return response.data;
};