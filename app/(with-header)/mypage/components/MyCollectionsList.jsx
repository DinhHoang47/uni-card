"use client";
import CollectionCard from "@components/CollectionCard";
import SkeletionLoading from "@components/Spinner/SkeletionLoading";
import useUser from "@lib/useUser";
import { publicUserServ } from "@services/Public_UserService";
import useSWR from "swr";

const collectionsFetcher = ([url, id]) =>
  publicUserServ.getUsersCollection(id).then((res) => res.data.posts);

export default function MyCollectionsList() {
  const { user,userIsLoading } = useUser();
  const {
    data: posts,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(() => [`/user/id/posts`, user.id], collectionsFetcher,
  {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  if (isLoading || userIsLoading) return  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10"><SkeletionLoading /></div>
  if (posts) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-10">
        {posts.map((post) => (
          <CollectionCard data={...post} key={post.id} />
        ))}
      </div>
    );
  }
}
