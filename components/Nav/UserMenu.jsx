import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import useUser from "@lib/useUser";
import * as api from "../../app/api/index.js";

export default function UserMenu({ closeTooltip, ...props }) {
  const { mutateUser } = useUser();
  return (
    <div {...props}>
      <ul className="px-2 font-semibold">
        <li>
          <button
            onClick={async () => {
              console.log("logout");
              const { data: user } = await api.LogOut();
              mutateUser(user, false);
              closeTooltip();
            }}
            className="flex items-center space-x-1 hover:text-blue-500"
          >
            <span>Logout</span>
            <span>
              <ArrowLeftOnRectangleIcon className={`h-4 w-4`} />
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}
