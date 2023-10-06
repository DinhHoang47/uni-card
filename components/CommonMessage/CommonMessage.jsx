"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeMessage } from "@redux/commonMessageSlice.js";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function CommonMessage({ isOpen }) {
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
      icon: <ExclamationCircleIcon className={`h-6 w-6 text-blue-400`} />,
      class: `flex items-center px-2 py-2 space-x-2 border border-slate-200 rounded shadow-lg bg-blue-100`,
    },
    success: {
      color: "green",
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
      class: `flex items-center px-2 py-2 space-x-2 border border-slate-200 rounded shadow-lg bg-green-100`,
    },
    warning: {
      color: "orange",
      icon: <CheckCircleIcon className="h-6 w-6 text-orange-500" />,
      class: `flex items-center px-2 py-2 space-x-2 border border-slate-200 rounded shadow-lg bg-orange-100`,
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(removeMessage());
    }, 3000);
  }, []);

  return (
    <li {...props} className={type[variation].class}>
      <span>{type[variation].icon}</span>
      <p className={`text-${type[variation].color}-600`}>{message}</p>
    </li>
  );
};
