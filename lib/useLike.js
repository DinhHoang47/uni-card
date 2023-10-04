import { privateCollectionServ } from "@services/Private_CollectionService";
import { useEffect } from "react";
import useSWR from "swr";
import useUser from "./useUser";
const fetcher = () =>
  privateCollectionServ()
    .getLikedPost()
    .then((res) => res.data);
export const useLike = (isLoggedIn, collectionId) => {
  const { data: likedPosts, mutate: likedPostsMutate } = useSWR(
    isLoggedIn ? "likedPosts" : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  let liked = false;
  if (likedPosts) {
    liked = likedPosts.includes(collectionId);
  }

  return { liked, likedPosts, likedPostsMutate };
};
