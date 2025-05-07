import axios from "axios";
import { Response } from "document/types/processTypes";
import { ProgressProcess } from "document/types/progressProcessTypes";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getProgressProcesses = async (
  idProcess: number
): Promise<ProgressProcess[]> => {
  const response = await api.get(`/api/progress_processes/${idProcess}`);
  return response.data;
};

export const deleteProgressProcess = async (id: number): Promise<Response> => {
  const response = await api.delete(`/api/progress_processes/${id}`);

  return response.data;
};

export const createProgressProcess = async (
  data: Omit<ProgressProcess, "id" | "created_at" | "updated_at">
): Promise<ProgressProcess | Response> => {
  const response = await api.post("/api/progress_processes", data);
  return response.data;
};

export const updateProgressProcess = async (
  id: number,
  data: Omit<ProgressProcess, "id" | "created_at" | "updated_at">
): Promise<ProgressProcess | Response> => {
  const response = await api.put(`/api/progress_processes/${id}`, data);
  return response.data;
};
