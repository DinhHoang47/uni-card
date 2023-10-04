import { StarIcon } from "@heroicons/react/24/outline";
import { deepClone } from "@lib/deepClone";
import { useLike } from "@lib/useLike";
import useUser from "@lib/useUser";
import { open } from "@redux/authModalSlice";
import { privateCollectionServ } from "@services/Private_CollectionService";
import { publicCollectionServ } from "@services/Public_CollectionService";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const fetchLike = ([url, id]) =>
  publicCollectionServ
    .getCollectionLikes(id)
    .then((res) => res.data)
    .catch((err) => err);

export default function StarButton({ collectionId }) {
  const dispatch = useDispatch();
  const { data, mutate } = useSWR(
    ["collections/id/likes", collectionId],
    fetchLike,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const { user } = useUser();
  const handleLike = async () => {
    try {
      // Clone current liked post array
      let currentLikedPosts = deepClone(likedPosts);
      if (liked) {
        currentLikedPosts = currentLikedPosts.filter(
          (postId) => postId !== collectionId
        );
      } else {
        currentLikedPosts.push(collectionId);
      }
      likedPostsMutate(currentLikedPosts, {
        optimisticData: currentLikedPosts,
        revalidate: false,
      });
      const result = await privateCollectionServ()
        .like(collectionId)
        .then((res) => res.data);

      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const { liked, likedPosts, likedPostsMutate } = useLike(
    user?.isLoggedIn,
    collectionId
  );

  return (
    <>
      <button
        onClick={() => {
          user.isLoggedIn === true ? handleLike() : dispatch(open());
        }}
        className="flex space-x-1"
      >
        <StarIcon className={`h-5 w-5 ${liked && "fill-yellow-400"}`} />
        <span className="font-satoshi">{data?.likeCount}</span>
      </button>
    </>
  );
}
