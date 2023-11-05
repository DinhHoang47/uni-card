import { privateUserServ } from "@services/Private_UserService";
import useSWR from "swr";

const fetcher = () => {
  return privateUserServ()
    .getLearningCollections()
    .then((res) => res.data);
};
export const useLearningCollection = () => {
  const { data, isLoading, error } = useSWR(
    "user/learning/collections",
    fetcher,
    {
      // revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );
  return { data, isLoading, error };
};
