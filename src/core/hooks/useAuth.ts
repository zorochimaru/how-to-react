import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async () => {
  try {
    const { data } = await axios.get("/api/auth/me");
    return data;
  } catch {
    return null;
  }
};

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000,
  });
};
