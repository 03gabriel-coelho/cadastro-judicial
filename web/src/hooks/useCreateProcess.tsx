import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useApp } from "document/app/appContext";
import { createProcess } from "document/services/processServices";
import { Process, Response } from "document/types/processTypes";

export const useCreateProcess = () => {
  const queryClient = useQueryClient();
  const { showToast } = useApp();

  return useMutation({
    mutationFn: (
      data: Omit<Process, "id" | "created_at" | "updated_at" | "state">
    ) => createProcess(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["processes"] });
      showToast(
        `${
          (data as Process).state.federal_state === "MG"
            ? "Processo de"
            : "Processo fora de"
        } MG criado com sucesso`,
        "success"
      );
    },
    onError: (error: AxiosError<Response>) => {
      const errorMessage =
        error.response?.data?.message || "Erro ao criar processo";
      showToast(errorMessage, "error");
    },
  });
};
