import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    queryClient.clear();

    router.push("/login");
  };

  return logout;
}
