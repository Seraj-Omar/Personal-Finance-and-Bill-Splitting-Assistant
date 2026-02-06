import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/auth.api";
import { RegisterPayload } from "../type";



export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });
}
