"use client";
import CollectionCard from "@components/CollectionCard";
import SkeletionLoading from "@components/Spinner/SkeletionLoading";
import useUser from "@lib/useUser";
import { publicUserServ } from "@services/Public_UserService";
import useSWR from "swr";

const collectionsFetcher = ([url, id]) =>
  publicUserServ.getUsersCollection(id).then((res) => res.data.posts);

export default function MyCollectionsList() {
  const { user } = useUser();
  const {
    data: posts,
    error,
    isLoading,
    mutate,
  } = useSWR(() => [`/user/id/posts`, user.id], collectionsFetcher,
  {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  if (isLoading) return <SkeletionLoading />;
  if (posts) {
    console.log(posts);
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-10">
        {posts.map((post) => (
          <CollectionCard user = {user} data={...post} key={`post-${post.id}`} />
        ))}
      </div>
    );
  }
}
