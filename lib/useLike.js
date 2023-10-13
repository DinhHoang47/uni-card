import { privateCollectionServ } from "@services/Private_CollectionService";
import useSWR from "swr";
const fetcher = (param) =>
  privateCollectionServ.getLikedPost().then((res) => res.data);
export const useLike = (collectionId, isLoggedIn) => {
  let liked = false;
  const { data: likedPosts, mutate: likedPostsMutate } = useSWR(
    () => (isLoggedIn ? "likedPosts" : false),
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (likedPosts) {
    liked = likedPosts.includes(collectionId);
  }
  return { liked, likedPosts, likedPostsMutate };
};
