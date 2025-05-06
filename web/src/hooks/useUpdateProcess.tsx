import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProcess } from "document/services/processServices";
import { Process } from "document/types/processTypes";
import { useApp } from "document/app/appContext";

export function useUpdateProcess() {
  const queryClient = useQueryClient();
  const { showToast } = useApp();

  const mutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Omit<Process, "id" | "created_at" | "updated_at" | "state">;
    }) => updateProcess(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["processes"] });
      showToast("Processo atualizado com sucesso", "success");
    },

    onError: () => {
      const errorMessage = "Erro ao atualizar processo";

      showToast(errorMessage, "error");
    },
  });

  return mutation;
}
