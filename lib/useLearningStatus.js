import { privateUserServ } from "@services/Private_UserService";
import useSWR from "swr";

const fetcher = async ([url, collectionId]) =>
  privateUserServ()
    .getTestResult(collectionId)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error();
    });

export const useLearningStatus = (collectionId) => {
  const { data, isLoading, error, mutate } = useSWR(
    [`/user/collections/${collectionId}/test-result`, collectionId],
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, isLoading, error, mutate };
};
