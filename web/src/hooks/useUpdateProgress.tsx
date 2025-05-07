import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProgressProcess } from "document/services/progressProcessServices";
import { useApp } from "document/app/appContext";
import { ProgressProcess } from "document/types/progressProcessTypes";

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  const { showToast } = useApp();

  const mutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Omit<ProgressProcess, "id" | "created_at" | "updated_at">;
    }) => updateProgressProcess(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress_processes"] });
      showToast("Andamento atualizado com sucesso", "success");
    },

    onError: () => {
      const errorMessage = "Erro ao atualizar andamento!";

      showToast(errorMessage, "error");
    },
  });

  return mutation;
}
