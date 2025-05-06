import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "document/app/toastContext";
import { deleteProcess } from "document/services/processServices";
import { Response } from "document/types/processTypes";

export const useDeleteProcess = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (id: number) => deleteProcess(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["processes"] });
      showToast("Processo deletado com sucesso", "success");
    },
    onError: (error: AxiosError<Response>) => {
      const errorMessage =
        error.response?.data?.error || "Erro ao deletar processo";

      showToast(errorMessage, "error");
    },
  });
};
