import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useApp } from "document/app/appContext";
import { createProgressProcess } from "document/services/progressProcessServices";
import { Response } from "document/types/processTypes";
import { ProgressProcess } from "document/types/progressProcessTypes";

export const useCreateProgress = () => {
  const queryClient = useQueryClient();
  const { showToast } = useApp();

  return useMutation({
    mutationFn: (
      data: Omit<ProgressProcess, "id" | "created_at" | "updated_at">
    ) => createProgressProcess(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress_processes"] });
      showToast("Andamento criado com sucesso!", "success");
    },
    onError: (error: AxiosError<Response>) => {
      const errorMessage =
        error.response?.data?.message || "Erro ao criar andamento!";
      showToast(errorMessage, "error");
    },
  });
};
