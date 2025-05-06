import axios from 'axios';
import { Process } from 'document/types/processTypes';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getProcesses = async (): Promise<Process[]> => {
  const response = await api.get('/api/processes');
  return response.data;
};