import useSWR from "swr";
import { privateUserServ } from "@services/Private_UserService";

const fetcher = () =>
  privateUserServ()
    .getTotalCollections()
    .then((res) => res.data);

export const useTotalCollections = () => {
  const { data, error, isLoading } = useSWR(`user/total/collections`, fetcher);
  return { data, error, isLoading };
};
