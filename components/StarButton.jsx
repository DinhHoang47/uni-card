import { StarIcon } from "@heroicons/react/24/outline";
import { useLike } from "@lib/useLike";
import useUser from "@lib/useUser";
import { open } from "@redux/authModalSlice";
import { privateCollectionServ } from "@services/Private_CollectionService";
import { publicCollectionServ } from "@services/Public_CollectionService";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const fetchLike = (id) =>
  publicCollectionServ
    .getCollectionLikes(id)
    .then((res) => res.data)
    .catch((err) => err);

export default function StarButton({ collectionId }) {
  const dispatch = useDispatch();
  const { data, error, trigger, mutate } = useSWR(collectionId, fetchLike, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { user } = useUser();
  const handleLike = async () => {
    try {
      const result = await privateCollectionServ().like(collectionId);
      mutate();
      likedPostsMutate();
    } catch (error) {
      console.log(error);
    }
  };

  const { liked, likedPostsMutate } = useLike(user?.isLoggedIn, collectionId);

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
