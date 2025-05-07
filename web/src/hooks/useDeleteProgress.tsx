import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useApp } from "document/app/appContext";
import { deleteProgressProcess } from "document/services/progressProcessServices";
import { Response } from "document/types/processTypes";

export const useDeleteProgress = () => {
  const queryClient = useQueryClient();
  const { showToast } = useApp();

  return useMutation({
    mutationFn: (id: number) => deleteProgressProcess(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress_processes"] });
      showToast("Andamento deletado com sucesso", "success");
    },
    onError: (error: AxiosError<Response>) => {
      const errorMessage =
        error.response?.data?.error || "Erro ao deletar andamento!";

      showToast(errorMessage, "error");
    },
  });
};
