import useSWR from "swr";
import { publicCollectionServ } from "@services/Public_CollectionService";

const cardFetcher = async ([url, id]) => {
  return publicCollectionServ
    .getCardList(id)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error();
    });
};

export const useCard = (collectionId) => {
  const { data, error, loading, mutate } = useSWR(
    ["collections/id/cards", collectionId],
    cardFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, loading, mutate };
};
