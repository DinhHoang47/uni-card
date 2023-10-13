import { publicCollectionServ } from "@services/Public_CollectionService";
import useSWR from "swr";

const fetcher = ([url, id]) =>
  publicCollectionServ.getCollectionDetail(id).then((res) => res.data);

export const useCollection = (id) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["collections/id", id],
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading, mutate };
};
