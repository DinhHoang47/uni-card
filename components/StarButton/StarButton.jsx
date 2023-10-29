import { StarIcon } from "@heroicons/react/24/outline";
import { deepClone } from "@utils/deepClone";
import { useLike } from "@lib/useLike";
import useUser from "@lib/useUser";
import { open } from "@redux/authModalSlice";
import { privateCollectionServ } from "@services/Private_CollectionService";
import { publicCollectionServ } from "@services/Public_CollectionService";
import { useDispatch } from "react-redux";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";

const fetchLike = ([url, id]) =>
  publicCollectionServ
    .getCollectionLikes(id)
    .then((res) => res.data)
    .catch((err) => err);

export default function StarButton({ collectionId, userId, likes }) {
  // Fetched data
  const { user } = useUser();
  const { liked, likedPosts, likedPostsMutate } = useLike(
    collectionId,
    user?.isLoggedIn
  );
  // Manual mutate to get new likes
  const { data: likesN, trigger } = useSWRMutation(
    ["collections/id/likes", collectionId],
    fetchLike
  );
  useEffect(() => {
    if (likesN !== undefined) {
      setCurrentLikes(likesN.likeCount);
    }
  }, [likesN]);
  // Local state
  const [currentLikes, setCurrentLikes] = useState(likes);
  // Handler
  const dispatch = useDispatch();
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
      const result = await privateCollectionServ
        .like(collectionId)
        .then((res) => res.data);
      trigger();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          user.isLoggedIn === true ? handleLike() : dispatch(open());
        }}
        className="flex items-start"
      >
        <div className="inline-flex space-x-1  hover:-translate-y-[2px] transition-all">
          <StarIcon
            className={`h-5 w-5 ${
              liked && "fill-yellow-400"
            } hover:shadow-[0_0.5rem_0.5rem_-0.4rem_rgba(251,235,55,1)] `}
          />
          <span className="font-satoshi">{currentLikes}</span>
        </div>
      </button>
    </>
  );
}
