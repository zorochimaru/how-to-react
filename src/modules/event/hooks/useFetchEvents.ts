import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../core";

export const fetchEvents = async () => {
  const response = await apiClient.get("/todos");
  return response.data;
};

export const useProtectedResource = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
};
