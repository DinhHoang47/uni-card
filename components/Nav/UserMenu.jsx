import useUser from "@lib/useUser";
import * as api from "../../app/api/index.js";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";

export default function UserMenu({ closeTooltip, ...props }) {
  const { mutateUser } = useUser();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  return (
    <div className="min-w-max" {...props}>
      <ul className="px-2 font-semibold space-y-2">
        <li className="">
          <button
            onClick={() => {
              router.push("/mypage");
              closeTooltip();
            }}
            className="flex items-center w-full space-x-1 hover:text-blue-500"
          >
            <span>
              <UserIcon className="h-4 w-4" />
            </span>
            <p>My page</p>
          </button>
        </li>
        <li className="">
          <button
            onClick={async () => {
              const { data: user } = await api.LogOut();
              mutateUser(user, false);
              closeTooltip();
              mutate((key) => true, undefined, {
                revalidate: true,
              });
            }}
            className="flex items-center w-full space-x-1 hover:text-blue-500"
          >
            <span>
              <ArrowLeftOnRectangleIcon className={`h-4 w-4`} />
            </span>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
