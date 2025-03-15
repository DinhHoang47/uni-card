import { PublicHomeSectionServ } from "@services/Public_HomeSectionService";
import useSWR from "swr";

const fetcher = ([url, id]) =>
  PublicHomeSectionServ.getHomeSectionsAndCollections().then((res) => res.data);

export const useHomesectionsCollections = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "homeSections/collections",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading, mutate };
};
