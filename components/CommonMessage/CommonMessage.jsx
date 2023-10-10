"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeMessage } from "@redux/commonMessageSlice.js";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function CommonMessage() {
  const messageArray = useSelector((state) => state.commonMessage.messageArray);
  const showModal = messageArray.length !== 0;
  return (
    <>
      {showModal &&
        createPortal(
          <ul className="fixed top-14 left-1/2 -translate-x-1/2 max-w-xs z-20 space-y-3">
            {messageArray.map((message, index) => (
              <MessageCard
                variation={message.variation}
                key={`messge-${index + 2}`}
                message={message.text}
              />
            ))}
          </ul>,
          document.getElementsByTagName("body")[0]
        )}
    </>
  );
}

const MessageCard = ({ variation = "info", message = "", ...props }) => {
  const [type] = useState({
    info: {
      color: "blue",
      icon: <ExclamationCircleIcon className={`h-6 w-6 text-blue-600`} />,
      class: `flex items-center px-2 py-2 space-x-2 border border-slate-200 rounded-lg shadow-lg bg-white`,
    },
    success: {
      color: "green",
      icon: <CheckCircleIcon className="h-6 w-6 text-green-600" />,
      class: `flex items-center px-2 py-2 space-x-2 border border-slate-200 rounded-lg shadow-lg bg-white`,
    },
    warning: {
      color: "orange",
      icon: <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />,
      class: `flex items-center px-2 py-2 space-x-2 border border-slate-200 rounded-lg shadow-lg bg-white`,
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(removeMessage());
    }, 3000);
  }, []);

  return (
    <li
      {...props}
      className={
        type[variation]?.class ||
        `flex items-center px-2 py-2 space-x-2 border border-slate-200 rounded-lg shadow-lg bg-white`
      }
    >
      <span>
        {type[variation] ? (
          type[variation].icon
        ) : (
          <ExclamationCircleIcon className={`h-6 w-6 text-blue-400`} />
        )}
      </span>
      <p className={``}>{message}</p>
    </li>
  );
};
