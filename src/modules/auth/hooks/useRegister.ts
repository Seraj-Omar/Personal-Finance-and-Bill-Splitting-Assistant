import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../services/auth.api";
import { RegisterPayload } from "../type";



export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
